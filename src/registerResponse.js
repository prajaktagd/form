const registerResponse = (form, response, logger, onResponseReady) => {
  try {
    form.fillCurrentField(response);
  } catch (error) {
    logger(error.message);
  }

  if (!form.isFilled()) {
    logger(form.getCurrentPrompt());
    return;
  }

  process.stdin.destroy();
  onResponseReady(form.getResponses());
  logger('Thank you');
};

module.exports = { registerResponse };
