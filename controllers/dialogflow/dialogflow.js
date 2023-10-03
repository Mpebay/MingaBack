import dialogflow from "@google-cloud/dialogflow"
//import { struct } from 'pb-util';
//import keys from '../../config/keys.js';
/* import getAuthUrl from "../google.js";
import redirect from "../redirect.js"; */

//const router = express.Router();


/* //projectId: ID of the GCP project where Dialogflow agent is deployed
const projectId = "mingabot-wauv"
// sessionId: String representing a random number or hashed user identifier
const sessionId = "1";
// queries: A set of sequential queries to be send to Dialogflow agent for Intent Detection
const queries = [
    "Hola"  // Rooms are defined on the Dialogflow agent, default options are A, B, or C
]
// languageCode: Indicates the language Dialogflow agent should use to detect intents
const languageCode = 'es'; */





const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(
    projectId,
    sessionId,
    query,
    contexts,
    languageCode
) {
    console.log("detectIntent", { projectId, sessionId, query, contexts, languageCode })
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId
    );

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    for (const query of queries) {
        try {
            console.log(`Sending Query: ${query}`);
            intentResponse = await detectIntent(
                projectId,
                sessionId,
                query,
                context,
                languageCode
            );
            console.log('Detected intent');
            console.log(
                `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
            );
            // Use the context from this response for next queries
            context = intentResponse.queryResult.outputContexts;
            return (intentResponse.queryResult.fulfillmentText)
        } catch (error) {
            throw error;
        }
    }
}

/* router.post('/send_message',
    async (req, res) => {
        const { message } = req.body;
        const request = {
        
        };

        try {
            const response = await executeQueries(projectId, sessionId, [message], languageCode);
            return res.json({ message: response })

        } catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    });
router.get("/", getAuthUrl)
router.get("/redirect", redirect)
 */


export default { executeQueries };