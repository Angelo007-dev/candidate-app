import { useMemo, useState } from "react";
import type { QueryParamsOptions } from "../service/candidateApi";
import CustomInput from "../components/input/CustomInput";
import CustomSelect from "../components/input/CustomSelect";
import type { TCandidatetatus } from "../constants";
import { useList, useUpdate } from "../hooks/useApi";
import { CheckIcon, EyeIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ICreateInput } from "../model/model";


const statusFr: Record<string, string> = {
    pending: "En attente",
    validate: "Validé",
};
interface IFilters {
    name?: string;
    email?: string;
    status?: string;
    phone?: string;
}
export default function ListCandidate() {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<ICreateInput>>({});

    //page and filters
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [filters, setFilters] = useState<IFilters>({
        email: "",
        name: "",
        status: "",
        phone: "",
    });

    //hooks
    const query: QueryParamsOptions = useMemo(() => ({
        page,
        limit,
        filters: filters,
        sort: { createdAt: -1 }
    }), [page, limit, filters]);

    const { data, isLoading, isError, isFetching } = useList(query);

    const { mutate: updateCandidate } = useUpdate();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]" >
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" > </div>
                < span className="text-gray-700 text-lg font-medium" > Chargement...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]" >
                <span className="text-red-500 text-lg font-semibold mb-2" > Erreur lors du chargement </span>
                < span className="text-gray-500 text-sm" > Veuillez réessayer plus tard </span>
            </div>
        );
    }
    //pagination
    const totalPages = data?.data?.meta?.totalPage || 1;

    //handler
    const handleView = (candidate: any) => {
        alert(`Voir le candidat: ${candidate.name}`);
    };
    const handleEdit = (candidate: any) => {
        setEditingId(candidate._id);
        setEditValues({ name: candidate.name, email: candidate.email, phone: candidate.phone })
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValues({});
    };

    const handleSave = (id: string) => {
        //api
        updateCandidate({
            _id: id,
            payload: editValues,
        }
        );

        setEditingId(null);
    };

    const handleChange = (field: string, value: string) => {
        setEditValues({ ...editValues, [field]: value })
    }

    return (
        <div className='p-6' >
            <div className='bg-white shadow-md rounded-lg p-6' >
                <div className='flex flex-wrap gap-4 mb-6' >
                    <CustomInput
                        label='Nom'
                        placeholder='ex: Angelo'
                        value={filters.name}
                        onChange={(e) => {
                            setFilters({ ...filters, name: e.target.value });
                            setPage(1);
                        }}
                    />
                    < CustomInput
                        label='Email'
                        placeholder='ex: angelo@gmail.com'
                        value={filters.email}
                        onChange={(e) => {
                            setFilters({ ...filters, email: e.target.value })
                            setPage(1);
                        }}
                    />
                    < CustomInput
                        label='Numéro Téléphone'
                        placeholder='ex: 032 44 004 64'
                        value={filters.phone}
                        onChange={(e) => {
                            setFilters({ ...filters, phone: e.target.value })
                            setPage(1);
                        }}
                    />
                    < CustomSelect
                        label='Status'
                        value={filters.status}
                        onChange={(e) => {
                            setFilters({ ...filters, status: e.target.value as TCandidatetatus })
                            setPage(1);
                        }}
                    >
                        <option value="" > Tous </option>
                        < option value="pending" > En Attente </option>
                        < option value="validate" > Validé </option>
                    </CustomSelect>
                    < CustomSelect
                        label='Limite'
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={5}> 5 </option>
                        < option value={10} > 10 </option>
                        < option value={20} > 20 </option>
                    </CustomSelect>
                </div>
                {
                    (isLoading || isFetching) && (
                        <div className="flex flex-col items-center justify-center h-[60vh]" >
                            <div className="relative w-16 h-16 mb-4" >
                                <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-spin border-t-blue-500" > </div>
                                < div className="absolute inset-0 rounded-full border-4 border-gray-200" > </div>
                            </div>
                            < span className="text-gray-700 text-lg font-medium" > Chargement...</span>
                        </div>
                    )
                }
                {
                    !isLoading && data?.data.data.length === 0 && (
                        <div className="flex items-center justify-center h-[40vh] text-gray-500 text-lg" >
                            Aucun résultat trouvé
                        </div>
                    )
                }
                {
                    !isLoading && (data?.data?.data || []).length > 0 && (
                        <div className='overflow-x-auto' >
                            <table className='min-w-full border border-gray-200 rounded-lg' >
                                <thead className='bg-blue-50 text-left text-gray-700 uppercase text-sm' >
                                    <tr>
                                        <th className='p-3 border-b' > Nom </th>
                                        < th className='p-3 border-b' > Email </th>
                                        < th className='p-3 border-b' > Numéro Téléphone </th>
                                        < th className='p-3 border-b' > Status </th>
                                        < th className='p-3 border-b' > Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.data.data.map((candidate: any) => {
                                            const isEditing = editingId === candidate._id;
                                            return (
                                                <tr key={candidate._id} className='hover:bg-gray-50' >
                                                    <>
                                                    </>
                                                    <td className='p-3 border-b' >
                                                        {isEditing ? (
                                                            <input
                                                                value={editValues.name}
                                                                onChange={(e) => handleChange('name', e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        ) : (candidate.name)
                                                        }
                                                    </td>
                                                    < td className='p-3 border-b' >
                                                        {isEditing ? (
                                                            <input
                                                                value={editValues.email}
                                                                onChange={(e) => handleChange('email', e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        ) : (candidate.email)}
                                                    </td>
                                                    < td className='p-3 border-b' >
                                                        {isEditing ? (
                                                            <input
                                                                value={editValues.phone}
                                                                onChange={(e) => handleChange('phone', e.target.value)}
                                                                className="border rounded px-2 py-1 w-full"
                                                            />
                                                        ) : (candidate.phone)}
                                                    </td>
                                                    < td className='p-3 border-b uppercase' >
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-white text-sm ${candidate.status === 'validate'
                                                                ? 'bg-green-500'
                                                                : candidate.status === 'pending'
                                                                    ? 'bg-yellow-500'
                                                                    : 'bg-red-500'
                                                                }`}
                                                        >
                                                            {statusFr[candidate.status] || candidate.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 border-b flex gap-6">
                                                        {isEditing ? (
                                                            <>
                                                                <button
                                                                    className="text-green-500 hover:text-green-700"
                                                                    onClick={() => handleSave(candidate._id)}
                                                                >
                                                                    <CheckIcon className="w-5 h-5" />
                                                                </button>
                                                                <button
                                                                    className="text-red-500 hover:text-red-700"
                                                                    onClick={handleCancel}
                                                                >
                                                                    <XMarkIcon className="w-5 h-5" />
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                    onClick={() => handleEdit(candidate)}
                                                                >
                                                                    <PencilIcon className='w-5 h-5' />
                                                                </button>
                                                                <button
                                                                    className="text-indigo-500 hover:text-indigo-700"
                                                                    onClick={() => handleView(candidate)}
                                                                >
                                                                    <EyeIcon className='w-5 h-5' />
                                                                </button>
                                                            </>
                                                        )

                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )}
            </div>
            < div className='flex justify-end items-center mt-6 gap-4' >
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition'
                >
                    Précedent
                </button>
                <span>
                    Page {page}/{totalPages}
                </span>
                < button
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 transition'
                >
                    Suivant
                </button>
            </div>
        </div>
    )
}
