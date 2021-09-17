import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, 
        BreadcrumbItem, Modal, ModalHeader, ModalBody, Form,
        FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component }  from 'react';

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            yourname : '',
            rating: '',
            comment:'',
            isModalOpen: false

        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({rating: event.target.value});
      }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Button attribute="outline" className="fa-lg" onClick={this.toggleModal} >
                <i className="fas fa-pencil" />
                Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
            <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="Rating">Rating</Label>
                        <select value={this.state.rating} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        { /* <Input type="select" id="5ating" name="rating" 
                            innerRef={input => this.rating = input} /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="YourName">Your Name</Label>
                        <Input type="text" id="yourname" name="yourname"
                            innerRef={input => this.yourname = input} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="Comment">Comment</Label>
                        <Input type="textarea" id="comment" name="comment"
                            innerRef={input => this.comment = input} />
                    </FormGroup>
                    
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </Form>

            </ModalBody>
            </Modal>

            </React.Fragment>
            
            

        );

    }//end render

    

}//end class

function RenderCampsite({campsite}) {
        return(
            <div className = "col-md-5 m-1">
                 <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>

        );
}


function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return(
                <div className = "col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => <div key = {comment.id}><p>{comment.text}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p></div>)}

                    <CommentForm campsiteId={campsiteId} addComment={addComment} />    
                </div>
                
                

                );

        }
        
        
}

function CampsiteInfo(props) {
        if (props.campsite){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />

                    </div>

                </div>
            );
        }
        return <div/>       

}// end render

//end class

export default CampsiteInfo;