/// <reference types="cypress" />

import { LINKS } from "../../src/app/constants/menu";

interface Candidate {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

describe('Gestion des candidats', () => {
    let candidateId: string;

    before(() => {

        cy.request('POST', 'http://localhost:3002/api/candidate/create', {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            status: 'pending'
        }).then(res => {
            expect(res.status).to.eq(200);
        });

        cy.request('GET', 'http://localhost:3002/api/candidate/all/candidates')
            .then(res => {
                expect(res.status).to.eq(200);
                const candidates = res.body.data.data as Candidate[];
                const candidate = candidates.find(c => c.email === 'john@example.com' && c.status === 'pending');
                expect(candidate).to.exist;
                candidateId = candidate!._id;
                cy.log('Candidate ID: ' + candidateId);
            });
    });

    it('Voir le candidat créé', () => {

        cy.intercept('GET', `http://localhost:3002/api/candidate/*`).as('getCandidate');

        // Visiter la page
        cy.visit(`http://localhost:5173${LINKS.VIEW_FUNC(candidateId)}`);

        // Attendre que le fetch du candidat soit terminé
        cy.wait('@getCandidate');

        // Vérifier que le DOM affiche les informations
        cy.contains('John Doe', { timeout: 10000 });
        cy.contains('john@example.com');
        cy.contains('+1234567890');
    });

    it('Valider le candidat', () => {
        cy.request('PATCH', `http://localhost:3002/api/candidate/validate/${candidateId}`)
            .then(res => {
                expect(res.status).to.eq(200);
            });

        cy.request('GET', 'http://localhost:3002/api/candidate/all/candidates')
            .then(res => {
                const candidates = res.body.data.data as Candidate[];
                const candidate = candidates.find(c => c._id === candidateId);
                expect(candidate).to.exist;
                expect(candidate?.status).to.eq('validate');
            });
    });

    it('Supprimer le candidat', () => {
        cy.request('DELETE', `http://localhost:3002/api/candidate/delete/${candidateId}`)
            .then(res => {
                expect(res.status).to.eq(200);
            });

        cy.request('GET', 'http://localhost:3002/api/candidate/all/candidates')
            .then(res => {
                const candidates = res.body.data.data as Candidate[];
                const candidate = candidates.find(c => c._id === candidateId);
                expect(candidate).to.not.exist;
            });
    });
});