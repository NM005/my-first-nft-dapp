import logo from './logo.svg';
import './App.css';
import './resources/css/custom.css'
import React, { useState } from "react";
import axios from "axios";
import disPic from './resources/images/upload-file.jpg';

const xApiKey = "6YYVFYSK7PlguTsB";

function App() {
  const [file, setfile] = useState();
  const [network, setnetwork] = useState("devnet");
  const [privKey, setprivKey] = useState();
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [desc, setDesc] = useState();
  const [attr, setAttr] = useState();
  const [extUrl, setExtUrl] = useState();
  const [status, setStatus] = useState("Awaiting Upload");
  const [dispResponse, setDispResp] = useState("");

  const mintNow = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("network", network);
    formData.append("private_key", privKey);
    formData.append("name", name);
    formData.append("symbol", symbol);
    formData.append("description", desc);
    formData.append("attributes", attr);
    formData.append("external_url", extUrl);
    formData.append("file", file);

    axios({
      // Endpoint to send files
      url: "https://api.shyft.to/sol/v1/nft/create",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": xApiKey,
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },

      // Attaching the form data
      data: formData,
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res);
        setStatus("success: " + res.data.success);
        setDispResp(res.data);
      })

      // Catch errors if any
      .catch((err) => {
        console.warn(err);
        setStatus("success: false");
      });
  }

  return (
    <div className="App">
      <form>
        <label htmlFor="file">Select File</label>
        <input name="file" type="file" onChange={(e) => {
          const [file_selected] = e.target.files;
          setfile(e.target.files[0]);
        }} />
        <br />

        <label htmlFor="network">
          Network <span>(network: string)</span>
        </label>
        <select name="network" onChange={(e) => { setnetwork(e.target.value) }}>
          <option value="devnet">Devnet</option>
          <option value="testnet">Testnet</option>
          <option value="mainnet-beta">Mainnet Beta</option>
        </select>
        <br />

        <label htmlFor="private_key">Private Key (private_key:string)</label>
        <input type="text" name="private_key" onChange={(e) => { setprivKey(e.target.value) }} required />
        <br />

        <label htmlFor="name">Name (name:string)</label>
        <input type="text" name="name" onChange={(e) => { setName(e.target.value) }} required />
        <br />

        <label htmlFor="symbol">Symbol (symbol:string)</label>
        <input type="text" name="symbol" onChange={(e) => { setSymbol(e.target.value) }} required />
        <br />

        <label htmlFor="desc">Description (description:string)</label>
        <textarea name="desc" onChange={(e) => { setDesc(e.target.value) }} required></textarea>
        <br />

        <label htmlFor="attributes">Attributes (attributes:string)</label>
        <textarea name="attributes" onChange={(e) => { setAttr(e.target.value) }} required></textarea>
        <br />

        <label htmlFor="external_url">External Url (external_url:string)</label>
        <input type="text" name="external_url" onChange={(e) => { setExtUrl(e.target.value) }} />
        <br />

        <button type="submiit" onClick={mintNow}>
          Submit
        </button>
      </form>

      <textarea
        className="form-control"
        name=""
        value={JSON.stringify(dispResponse)}
        id=""
        cols="30"
        rows="10"
      ></textarea>

    </div>
  );
}

export default App;
