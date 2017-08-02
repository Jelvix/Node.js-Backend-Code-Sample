const {NotFoundError, BadRequestError} = require('../../utils/erros.model.js');
const ClubModel = require('./club.model');

class ClubService {
  static async createClub(title) {
    const existingClub = await ClubModel.find({where: {title}});
    if (existingClub) {
      throw new BadRequestError('The club already exist.');
    }

    let club = await ClubModel.create({title}, {returning: true});

    if (!club) {
      throw new Error('Cannot create a tournament.');
    }

    return {id: club.id, title: club.title};
  }

  static async getClubs(query) {
    let options = {
      offset: +query.offset || 0,
      limit: +query.limit || 30,
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'deletedAt']
      }
    };

    return await ClubModel.findAll(options);
  }

  static async updateClub(id, title) {
    const club = await ClubModel.findById(id);
    if (!club) {
      throw new NotFoundError(`The club doesn't exist.`);
    }

    await club.update({title});

    return {id: club.id, title: club.title};
  }

  static async deleteClub(id){
    const club = await ClubModel.destroy({where: {id}});
    if (!club) {
      throw new NotFoundError(`Tournament doesn't exist.`);
    }
  }
}

module.exports = ClubService;
