import { inngest } from "../client";
import { User } from "../../models/user.model";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer";

export const onSignUp = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User no longer exist in database");
        }
        return userObject;
      });

      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to the app`;
        const message = `Hi,
        \n\n
        Thanks for sining up. We're glad to have you onboard!
        `;
        await sendMail(user.email, subject, message);

        return { success: true };
      });
    } catch (err) {
      console.error(`❌ Error running step`, err.message);
      return { success: false };
    }
  }
);
