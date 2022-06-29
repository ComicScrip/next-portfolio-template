import nc from "next-connect";
import morgan from "morgan";

morgan.token("reqbody", (req) => {
  const bodyToLog = { ...req.body };
  if (bodyToLog.password) {
    bodyToLog.password = "...";
  }
  return JSON.stringify(bodyToLog, null, 2);
});

const logger = morgan(
  ":method :url \nreq.body: :reqbody \n:status - :response-time ms\n"
);

export default function base() {
  return nc({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(500).end("Sorry, an error occured, please try again later");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Not found");
    },
  }).use(logger);
}
