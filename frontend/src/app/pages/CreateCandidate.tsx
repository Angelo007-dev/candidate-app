import { useNavigate } from "react-router-dom";
import CustomInput from "../components/input/CustomInput";
import { LINKS } from "../constants/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateSchema, type CandidateFormValues } from "../model/model";
import { useCreate } from "../hooks/useApi";
import { useForm } from "react-hook-form";

export default function Create() {
    const { mutate } = useCreate();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CandidateFormValues>({
        resolver: zodResolver(CandidateSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });
    const onSubmit = (data: CandidateFormValues) => {
        mutate(data,
            {
                onSuccess: () => {
                    navigate(LINKS.LIST);
                }
            }
        );
    }

    return (

        <div className="max-w-xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">Créer un candidat</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <CustomInput
                    label='Nom'
                    placeholder="ex: Angelo Patrick"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <CustomInput
                    label='Email'
                    placeholder="ex: angelo@mail.com"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <CustomInput
                    label='Phone'
                    {...register("phone")}
                    placeholder="ex:0388527806"
                    className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Créer
                </button>

            </form>

        </div>
    );
}
