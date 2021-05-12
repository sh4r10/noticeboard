import React, { Component } from "react";
import axios from "axios";

class CreateNote extends Component{
    constructor(props){
        super(props);
        this.state = {
            heading: "",
            description: "",
            id: ""
        }
    }

    componentDidMount = () => {
        var url = window.location.pathname;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({id: id});
        axios.get(this.props.host+"/notes/"+id)
            .then(res => {
                this.setState({
                    heading: res.data.heading,
                    description: res.data.message
                })
            })
    }


    onChangeHeading = e => {
        this.setState({
            heading: e.target.value
        });
    }

    onChangeDescription = e =>{
        this.setState({
            description: e.target.value
        });
    }

    onSubmit = e =>{
        e.preventDefault();
        const note = {
            heading: this.state.heading,
            message: this.state.description,
        };
        const config = {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
        };
        axios.post(this.props.host + "/notes/update/"+this.state.id, note, config)
            .then(() => {
                window.location = "/"
            })
            .catch((err) => {
                if(err.response.status === 403){
                    sessionStorage.removeItem("token");
                    window.location = "/login"; 
                }
                else{
                    alert(err)
                }
            });
    }

    deleteItem = id =>{
        const config = {
            headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}
        };
        axios.delete(this.props.host + "/notes/"+id, config)
            .then((res) => {
                window.location = "/"
            })
            .catch((err) => {
                if(err.response.status === 403){
                    sessionStorage.removeItem("token");
                    window.location = "/login"; 
                }
                else{
                    alert(err)
                }
            });
    }

    render(){
        return(
            <div>
                <h3>Edit Note</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group"> 
                    <label>Heading: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.heading}
                        onChange={this.onChangeHeading}
                        />
                </div>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Note!" className="btn submit-button" />
                    <button type="reset" onClick={() => this.deleteItem(this.state.id)} className="btn second-btn">Delete Note!</button>
                </div>
                </form>
            </div>
        )
    }
}

export default CreateNote;