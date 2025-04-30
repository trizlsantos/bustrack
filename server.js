import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import fs from 'fs';

const PORT = 3333;
const url_database = './database.json';

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true
}));

app.use(express.json());


const motoristas = [];

app.post('/motorista', (request, response) => {
    const { nome, data_nascimento, num_carteira_habilitacao } = request.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        response.status(400).json({ mensagem: "Nome é obrigatório" });
        return;
    }

    if (!data_nascimento || typeof data_nascimento !== 'string' || data_nascimento.trim() === '') {
        response.status(400).json({ mensagem: "A data de nascimento é obrigatória e deve ser uma string válida" });
        return;
    }
    
    if (!num_carteira_habilitacao || typeof num_carteira_habilitacao !== 'string' || num_carteira_habilitacao.trim() === '') {
        response.status(400).json({ mensagem: "O número da carteira de habilitação é obrigatório e deve ser uma string válida" });
        return;
    }

    fs.readFile(url_database, 'utf-8', (err, data) => {
        if (err) {
            response.status(500).json({ mensagem: "Erro ao ler arquivo" });
            return;
        }

        const motorista = {
            id: uuidv4(),
            nome,
            data_nascimento,
            num_carteira_habilitacao
        };

        motoristas.push(motorista); 
        response.status(201).json({ mensagem: "Motorista cadastrado com sucesso", motorista });
    }); 
}); 

app.listen(PORT, () => {
    console.log(`Server está rodando na porta ${PORT}`);
});

app.get('/motoristas', (request, response) => {
    response.status(200).json(motoristas);
});


const onibusList = []; 

app.post('/onibus', (request, response) => {
    const { placa, modelo, ano_fabricacao, capacidade } = request.body;

    if (!placa) {
        response.status(400).json({ menssagem: "Placa é obrigatória" });
        return;
    }

    if (!modelo) {
        response.status(400).json({ menssagem: "Modelo é obrigatório" });
        return;
    }

    if (!ano_fabricacao) {
        response.status(400).json({ menssagem: "Ano de fabricação é obrigatório" });
        return;
    }

    if (!capacidade) {
        response.status(400).json({ menssagem: "Capacidade é obrigatória" });
        return;
    }

    const onibus = {
        id: uuidv4(),
        placa,
        modelo,
        ano_fabricacao,
        capacidade
    };
    
    onibusList.push(onibus); 
    response.status(201).json({ mensagem: "Ônibus cadastrado com sucesso", onibus });
});

app.get('/onibus', (request, response) => {
    response.status(200).json(onibusList);
});

app.get('/onibus/motorista', (request, response) => {
    response.status(200).json({ 
        mensagem: "Motorista vinculado com o ônibus encontrado com sucesso", 
        onibus: onibusList, 
        motoristas 
    });  
});

app.put('/motoristas/onibus', (request, response) => {
});

app.delete('/motoristas/onibus', (request, response) => {
  
});