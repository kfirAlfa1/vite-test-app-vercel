const GeminiStatus = () => {
  if (__GEMINI_KEY_CONFIGURED__) {
    return (
      <div className="mb-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
        Gemini API key configured.
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      Gemini API key is missing. AI features are disabled.
    </div>
  );
};

export default GeminiStatus;
