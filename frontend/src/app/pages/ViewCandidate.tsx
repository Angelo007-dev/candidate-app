import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CandidateSchema, type CandidateFormValues, } from "../model/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { LINKS } from "../constants/menu";
import CustomInput from "../components/input/CustomInput";
import { useValidate, useView } from "../hooks/useApi";

export default function View() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: candidate, isLoading, isError } = useView(id!);
    const { mutate: validateCandidate } = useValidate();

    const { register, handleSubmit, setValue } = useForm<CandidateFormValues>({
        resolver: zodResolver(CandidateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });
    useEffect(() => {
        if (candidate) {
            setValue("name", candidate.data.name);
            setValue('email', candidate.data.email);
            setValue("phone", candidate.data.phone);
            setValue("status", candidate.data.status);
        }
    }, [candidate, setValue, id]);
    const onSubmit = (data: CandidateFormValues) => {
        console.log("Données du formulaire :", data);
    };

    const handleValidate = () => {
        validateCandidate({ _id: id! }, {
            onSuccess: () => {
                navigate(LINKS.LIST)
            },
        })
    };

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (isError || !candidate) {
        return <div>Erreur : impossible de récupérer le candidat</div>;
    }


    return (

        <div className="max-w-xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Créer un candidat</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                    disabled
                    label='Nom'
                    placeholder="ex: Angelo Patrick"
                    {...register("name")}
                />

                <CustomInput
                    disabled
                    label='Email'
                    placeholder="ex: angelo@mail.com"
                    {...register("email")}
                />

                <CustomInput
                    disabled
                    label='Phone'
                    {...register("phone")}
                    placeholder="ex:0388527806"
                />
                <CustomInput
                    disabled
                    label='Status'
                    {...register("status")}
                />
                {candidate.data.status === "pending" ? (
                    <button
                        type="button"
                        onClick={handleValidate}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Valider
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => navigate(LINKS.LIST)}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Retour
                    </button>
                )}
            </form>
        </div>
    );
}