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

}

module.exports = PessoaController;