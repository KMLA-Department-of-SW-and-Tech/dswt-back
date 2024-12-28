import admin from "firebase-admin"
import serviceAccount from "../../kwagi-page-firebase-adminsdk-3tdnw-7360b510e0.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})

export default admin
