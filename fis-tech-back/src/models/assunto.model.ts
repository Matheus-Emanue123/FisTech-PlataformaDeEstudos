import { PrismaClient } from '../generated/prisma/client.js';
import { AssuntoCreateData, AssuntoUpdateData} from '../DTO/assunto.dto';


const prisma = new PrismaClient();


export const createAssunto = async (assuntoData: AssuntoCreateData) => {
    return prisma.assunto.create({
        data: assuntoData,
    });
};

export const updateAssunto = async (id: number, assuntoData: AssuntoUpdateData) => {
    return prisma.assunto.update({
        where: { id },
        data: assuntoData,
    });
};

export const deleteAssunto = async (id: number) => {
    return prisma.assunto.delete({
        where: { id },
    });
};

export const getAssuntoById = async (id: number) => {
    return prisma.assunto.findUnique({
        where: { id },
    });
}

export const getAssuntoByName = async (nome: string) => {
    return prisma.assunto.findFirst({
        where: { nome },
    });
}

export const getAllAssuntos = async () => {
    return prisma.assunto.findMany();
};

