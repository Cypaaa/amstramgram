import * as imageRepository from '../repositories/imageRepository.mjs';

const findImageById = async (id) => {
    return await imageRepository.findImageById(id);
};

export { findImageById };