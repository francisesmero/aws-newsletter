// Import required AWS SDK clients and commands for Node.js
import {
  SubscribeCommand,
  ListSubscriptionsByTopicCommand,
} from "../node_modules/@aws-sdk/client-sns";
import { snsClient } from "./api/client.js";

export default function Home({ SubscribeNumbers }) {
  async function Register() {
    const email = document.querySelector("#userEmail").value;
 

    const params = {
      Protocol: "email",
      TopicArn: "arn:aws:sns:us-east-1:561113779731:sns-newsletter",
      Endpoint: "francislucky46@gmail.com", 
    };

    try {
      const data = await snsClient.send(new SubscribeCommand(params));
      alert("Your email was successfully sign up!");
      document.querySelector("#userEmail").innerHTML = "";
      console.log("Success.", data);
      return data; // For unit tests.
    } catch (err) {
      alert("Type a valid email address!");
      console.log("Error", err.stack);
    }
  }

  return (

    

 <div className="main">
    <div className="row center">
        <img className="boldr_logo" src="./images/boldr.png"/>
        <p className="logo-sub">Rethink Outsourcing.</p>
    </div>

    <div className="row d-flex justify-content-center align-items-center rows">
        <div className="col-md-6">
            <div className="card">
                <div className="text-center">
                    <img src="/images/header-image.png" width="200"/>
                    <span className="d-block mt-3">Subscribe to our newsletter in order not to miss new arrivals <br/> promotions and discounts of our store</span>
                    

                    <div className="mx-5">
                      
                       <div className="input-group mb-3 mt-4">
                          <input className="form-control" id="userEmail" type="email" placeholder="✉ Type your email"/>
                          <button className="btn btn-success border-rad btn-main" onClick={() => Register()} >Subscribe</button>
                        </div>
                        <h2 id="result"></h2>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
    </div>




  );
}

export async function getStaticProps() {
  // Set the parameters
  const params = {
    TopicArn: "arn:aws:sns:us-east-1:561113779731:sns-newsletter",
  }; 

  const data = await snsClient.send(
    new ListSubscriptionsByTopicCommand(params)
  );
  const subs = data.Subscriptions;
  const qtd = subs.filter(function (sub) {
    return sub.SubscriptionArn === "PendingConfirmation" && "Deleted";
  });
  const SubscribeNumbers = subs.length - qtd.length;

  return {
    props: { SubscribeNumbers },
  };
}
