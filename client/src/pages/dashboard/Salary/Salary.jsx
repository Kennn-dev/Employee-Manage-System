import React,{useState, useRef} from 'react'
import { Jumbotron, Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';


export default function Salary() {
    const fileInput = useRef(null);
    const [state, setState] = useState({
        isOpen : false,
        dataLoaded : false,
        isFormInvalid : false,
        rows : null,
        cols : null,
        uploadedFileName : ""
    })

    const openFileBrowser = () => {
        fileInput.current.click();
    }

    const fileHandler = (e) => {
        if(e.target.files.length){
            let fileObj = e.target.files[0];
            let fileName = fileObj.name;
      
            
            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
              setState({
                ...state,
                uploadedFileName: fileName,
                isFormInvalid: false
              });
              renderFile(fileObj)
            }    
            else{
              setState({
                  ...state,
                isFormInvalid: true,
                uploadedFileName: ""
              })
            }
          }           
    }

    const renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            setState({
                ...state,
              dataLoaded: true,
              cols: resp.cols,
              rows: resp.rows
            });
          }
        }); 
    }

    const toggle = () => {
        setState({
            ...state,
            isOpen: !state.isOpen
        });
      }
    return (
        <div>
            <Container>
            <form>
                <FormGroup row>
                    <Label for="exampleFile" xs={6} sm={4} lg={2} size="lg">Upload</Label>          
                    <Col xs={4} sm={8} lg={10}>                                                     
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <Button color="info" style={{color: "white", zIndex: 0}} onClick={openFileBrowser}><i className="cui-file"></i> Browse&hellip;</Button>
                        <input type="file" hidden onChange={fileHandler} ref={fileInput} onClick={(e)=> { e.target.value = null }} style={{"padding":"10px"}} />                                
                        </InputGroupAddon>
                        <Input type="text" className="form-control" value={state.uploadedFileName} readOnly invalid={state.isFormInvalid} />                                              
                        <FormFeedback>    
                        <Fade in={state.isFormInvalid} tag="h6" style={{fontStyle: "italic"}}>
                            Please select a .xlsx file only !
                        </Fade>                                                                
                        </FormFeedback>
                    </InputGroup>     
                    </Col>                                                   
                </FormGroup>   
            </form>

            {state.dataLoaded && 
            <div>
                <Card body outline color="secondary" className="restrict-card">
                    
                    <OutTable data={state.rows} columns={state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
                    
                </Card>  
            </div>}
            </Container>
        </div>
    )
}
