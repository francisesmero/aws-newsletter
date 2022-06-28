import { PublishCommand } from "../node_modules/@aws-sdk/client-sns";
import { snsClient } from "./api/client.js";

export default function Message() {
  async function SendMessage() {
    const message = document.getElementById("message").value;
    const subject = document.getElementById("subject").value;

    var params = {
      Subject: subject,
      Message: message, // MESSAGE_TEXT
      TopicArn: "arn:aws:sns:us-east-1:561113779731:sns-newsletter"
    };

    try {
      const data = await snsClient.send(new PublishCommand(params));
      alert("Message sent successfully");
      document.getElementById("message").value = "";
      document.getElementById("subject").value = "";
      console.log("Success.", data);
      return data; // For unit tests.
    } catch (err) {
      alert("Error sending message");
      console.log("Error", err.stack);
    }
  }

  return (
    <div className="main">
      <h1>Write your message</h1>
      <textarea
        cols="50"
        rows="2"
        placeholder="Subject"
        type="text"
        id="subject"
      />
      <br />
      <textarea cols="50" rows="10" placeholder="Message" id="message" />
      <br />
      <button onClick={() => SendMessage()}>Send Message</button>
    </div>
  );
}
