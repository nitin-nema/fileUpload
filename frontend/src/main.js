import React from "react";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      imageURL: "",
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.file[0]);
    data.append("fileName", this.fileName.value);

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: data,
    }).then((res) =>
      res.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      })
    );
  }
  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input
            ref={(ref) => {
              this.uploadInput = ref;
            }}
            type="file"
          />
        </div>
        <div>
          <input
            ref={(ref) => {
              this.fileName = ref;
            }}
            type="file"
            placeholder="Enter the desired name of file"
          />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <div>
          <img src={this.state.imageUrl} alt="img" />
        </div>
      </form>
    );
  }
}
export default Main;
