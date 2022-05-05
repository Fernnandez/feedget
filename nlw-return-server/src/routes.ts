import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail.adapter';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks.repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (request, response) => {
  const { comment, type, screenshot } = request.body;


  // Dependency Injection
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    comment,
    type,
    screenshot,
  });

  return response.status(201).send();
});
