const database = require('../models');

class PessoaController {

  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({ 
        where: { id: Number(id) }
      });
      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaPessoa(req, res) {
    const pessoa = req.body;
    try {
      const novaPessoa = await database.Pessoas.create(pessoa);
      return res.status(200).json(novaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const pessoa = req.body;
    try {
      await database.Pessoas.update(pessoa, { where: { id: Number(id) }});
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) }});
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removePessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({ where: { id: Number(id) }});
      return res.status(200).json({mensagem: `id ${id} deletado `})
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const matricula = await database.Matriculas.findOne({ 
        where: { 
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }});
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const matricula = { ...req.body, estudante_id: Number(estudanteId) }

    try {
      const novaMatricula = await database.Matriculas.create(matricula);
      return res.status(200).json(novaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const matricula = req.body;
    try {
      await database.Matriculas.update(matricula, { 
        where: { 
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }});
      //Precisa dessa linha porque o sequelize só retorna 0 ou 1 e precisa obter o valor do objeto
      const matriculaAtualizada = await database.Matriculas.findOne({ 
        where: { 
          id: Number(matriculaId),
        }}); 
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async removeMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) }});
      return res.status(200).json({mensagem: `id ${matriculaId} deletado `})
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = PessoaController;