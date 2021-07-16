import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST'){
        const TOKEN = '867e53c0be7ea4c7f2c7d1e530880f';
        const client = new SiteClient(TOKEN);
        // Validar os dados, antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "967996", 
            ...request.body
        })
            response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
    }
} 