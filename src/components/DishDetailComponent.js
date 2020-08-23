import React, {  Component } from 'react';
import { Card, CardImg, CardBody, CardTitle,CardText, Breadcrumb , BreadcrumbItem, Modal , ModalBody , Button, ModalHeader, Row , Col, Label ,CustomInput, Input  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors , Control } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal = () => {

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    };
    handleSubmit = (values) => {
        this.toggleModal();
        console.log(values);
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment );
    };
    render(){
        return (
            <div>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg">Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                        <Col>
                            <Label htmlFor="rating">Rating</Label>
                                <Input model=".rating" id="rating" name="rating" type="select">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={2}>Author</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="author"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors
                                    className="text-danger" model=".author" show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                    }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" htmlFor="comment" id="comment" name="comment" rows="6"
                                    className="form-control" />
                            </Col>
                        </Row> 
                        <Row className="form-group">
                            <Col >
                                <Button type="submit" color="bg-primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

function RenderDish({dish}) {
        if(dish==null){
            return (
                <div></div>
            );
        }
        else{
           return (<div className="col-12 col-md-5 m-1" >
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            </div>
           );
        }

    };

function RenderComments({comments,addComment,dishId}) {
        if(comments!=null) {
            const comm=comments.map((comment)=>{
                return (

                        <li key={comment.id}>
                        <p className="mb-4">{comment.comment}</p>
                        <p className="mb-4">-- {comment.author} ,{new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short',day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                );
            });
        
            return (
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {comm}
                <CommentForm dishId={dishId} addComment={addComment}/>
                </ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

const DishDetail = (props) => {
    return (
    <div className='container'>
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish}/>
                <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                />
            </div>
    </div>
    );

}
       
export default DishDetail;
