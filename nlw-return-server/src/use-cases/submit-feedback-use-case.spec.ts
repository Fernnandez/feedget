import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Lorem Ipsum',
        screenshot: 'data:image/png;base64/example-image-base64',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'Lorem Ipsum',
        screenshot: 'Invalid format',
      })
    ).rejects.toThrow('Type is required');
  });

  it('should not be able submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'Invalid format',
      })
    ).rejects.toThrow('Comment is required');
  });

  it('should not be able submit feedback with a invalid screenshot format', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'Lorem Ipsum',
        screenshot: 'Invalid format',
      })
    ).rejects.toThrow('Invalid screenshot format');
  });
});
