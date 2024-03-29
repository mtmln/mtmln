import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  var temp = parseFloat(req.body.temp) || 0.0;
  const limit = parseInt(req.body.limit) || 10; 
  const cid = req.body.conversationId|| ''; 
  const mid = req.body.modelId || 'text-davinci-003'; 
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Podaj prompt",
      }
    });
    return;
  }
  if (temp > 1 || temp < 0)
	temp = 0;

  try {
    const completion = await openai.createCompletion({
	    model: mid,
      prompt: generatePrompt(animal),
      max_tokens: limit,
      temperature: temp,
    });
    //for(var text in completion.data.choices){
    console.log("temp: " + temp)
    console.log("limit: " + limit)
    console.log("mid: " + mid)
    console.log("cid: " + cid)


    //console.log(completion.data.choices);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  return animal;
}
