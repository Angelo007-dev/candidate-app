import { Request, Response } from "express";
import * as service from './candidate.service';
import { createCandidateSchema } from "../../dto/CreateCandidate.dto";
import { updateCandidateSchema } from "../../dto/UpdateCandidate.dto";
import { QueryParamsDto } from "../../dto/QueryParamsDto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const create = async (req: Request, res: Response) => {
    try {
        const validate = createCandidateSchema.parse(req.body);

        await service.createCandidate(validate);
        res.status(200).json({ message: "candiday créer" })
    } catch (err: any) {
        res.status(400).json({ error: err.errors || err.message });
    };
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "ID invalide" });
        };

        const candidate = await service.getCandidate(id);
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "ID invalide" });
        }
        if (!candidate) {
            return res.status(404).json({ message: "candidat non trouvée" });
        };
        res.json(candidate);
    }
    catch (err: any) {
        res.status(500).json({ error: err.errors || err.message });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const queryDto = plainToInstance(QueryParamsDto, req.query, { enableImplicitConversion: true });
        const errors = await validate(queryDto);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Paramètre invalide", errors });
        }

        const candidates = await service.listCandidates(queryDto);
        console.log("REQ QUERY RAW", req.query);
        res.json(candidates);
    }
    catch (err: any) {
        console.error("REAL ERROR", err);
        res.status(500).json({ message: 'Erreur lors de la récupération' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (typeof id !== 'string') {
            return res.status(400).json({ message: "ID invalide" });
        }

        const validate = updateCandidateSchema.parse(req.body);

        const updated = await service.updateCandidate(id, validate);
        if (!updated) {
            return res.status(404).json({ messge: 'candidat non trouvé' });
        }
        res.json({ message: 'candidat mise à jour' });

    } catch (err: any) {
        res.status(400).json({ error: err.errors || err.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "ID invalide" });
        };

        const deleted = await service.deleteCandidate(id);
        if (!deleted) {
            return res.status(404).json({ message: "candidat non trouvé" });
        };
        res.json({ message: "candidat supprimé" });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const validateCandidate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id !== 'string') {
            return res.status(400).json({ message: "ID invalide" });
        };

        const validated = await service.validateCandidate(id);

        if (!validated) {
            res.status(404).json({ message: "candidat non trouvé" });
        }
        res.json({ message: `candidat ${id} validé` });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
