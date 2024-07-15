const { SubjectTutor, Tutor, Subject, Grade } = require('../models');

exports.create = async (req, res) => {
  const { tutorid, subjectid, gradeid } = req.body;

  try {
    const newSubjectTutor = await SubjectTutor.create({
      tutorid,
      subjectid,
      gradeid,
    });

    res.status(201).send(newSubjectTutor);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the SubjectTutor.'
    });
  }
};

exports.findAll = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows }  = await SubjectTutor.findAndCountAll({
      include: [
        { model: Tutor,  as: 'tutor' },
        { model: Subject , as: 'subject' },
        { model: Grade  , as: 'grade' }
      ],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
        data: rows,
        totalPages,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const subjectTutor = await SubjectTutor.findByPk(id, {
      include: [
        { model: Tutor,  as: 'tutor' },
        { model: Subject , as: 'subject' },
        { model: Grade  , as: 'grade' }
      ]
    });

    if (subjectTutor) {
      res.send(subjectTutor);
    } else {
      res.status(404).send({
        message: `Cannot find SubjectTutor with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving SubjectTutor with id=${id}: ${err.message}`
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { tutorid, subjectid, gradeid } = req.body;

  try {
    const subjectTutor = await SubjectTutor.findByPk(id);

    if (!subjectTutor) {
      return res.status(404).send({ message: `Cannot find SubjectTutor with id=${id}.` });
    }

    await subjectTutor.update({
      tutorid: tutorid || subjectTutor.tutorid,
      subjectid: subjectid || subjectTutor.subjectid,
      gradeid: gradeid || subjectTutor.gradeid,
    });

    res.status(200).send({ message: "SubjectTutor was updated successfully!", subjectTutor });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while updating the SubjectTutor.'
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const subjectTutor = await SubjectTutor.findByPk(id);

    if (!subjectTutor) {
      return res.status(404).send({ message: `Cannot find SubjectTutor with id=${id}.` });
    }

    await subjectTutor.destroy();

    res.send({ message: "SubjectTutor was deleted successfully!", subjectTutor });
  } catch (err) {
    res.status(500).send({
      message: `Could not delete SubjectTutor with id=${id}: ${err.message}`
    });
  }
};
