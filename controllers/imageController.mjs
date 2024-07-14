import * as imageService from '../services/imageService.mjs';

const findImageById = async (req, res) => {
    const { id } = req.params;
    try {
        const image = await imageService.findImageById(id);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { findImageById };
