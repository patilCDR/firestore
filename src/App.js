import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import "./App.css";
import { async } from "@firebase/util";
// import { async } from "@firebase/util";

const firestore = getFirestore(app);

function App() {
  const writeData = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "Blr",
      pinCode: 121212,
      lat: 123,
      Long: 456,
    });

    console.log("Result", result);
  };

  const makeSubCollection = async () => {
    await addDoc(collection(firestore, "cities/Ir3fgxvP2DWTdP2iRdRV/places"), {
      name: "This place",
      desc: "Awsm Desc",
      date: Date.now(),
    });
  };

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "42be44wVHkLeNfidyApu");
    const snap = await getDoc(ref);

    console.log(snap.data());
  };

  const getDocumentsByQuery = async () => {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("isFemale", "==", true));
    const snapshot = await getDocs(q);
    snapshot.forEach((data) => console.log(data.data()));
  };

  const update = async () => {
    const docRef = doc(firestore, "cities", "42be44wVHkLeNfidyApu");
    await updateDoc(docRef, {
      name: "Banglore",
    });
  };

  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollection}>Put sub Data</button>
      <button onClick={getDocument}>get Document</button>
      <button onClick={getDocumentsByQuery}>get Documents By Query</button>
      <button onClick={update}>Update</button>
    </div>
  );
}

export default App;
