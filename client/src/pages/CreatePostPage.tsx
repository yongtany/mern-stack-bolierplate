import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../components/FileUpload/FileUpload';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "Dev" },
    { key: 2, value: "Travel" },
    { key: 3, value: "Life" },
    { key: 4, value: "Food" },
    { key: 5, value: "Church" },
]

function CreatePostPage(props: any) {

    const [TitleValue, setTitleValue] = useState("")
    const [ContentValue, setContent] = useState("")
    const [CategoryValue, setCategory] = useState(1)
    const [Images, setImages] = useState([])


    const handleTitleChange = (event: any) => {
        setTitleValue(event.currentTarget.value)
    }

    const handleContent = (event: any) => {
        setContent(event.currentTarget.value)
    }

    const handleCategorySelectChange = (event: any) => {
        setCategory(event.currentTarget.value)
    }

    const updateImages = (newImages: any) => {
        setImages(newImages)
    }
    const onSubmit = (event: any) => {
        event.preventDefault();

        if (!TitleValue || !ContentValue || 
            !CategoryValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            content: ContentValue,
            images: Images,
            continents: CategoryValue,
        }

        axios.post('/post/createPost', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Your Post</Title>
            </div>


            <Form>
                DropZone
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={handleTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={handleContent}
                    value={ContentValue}
                />
                <br />
                <br />
                
                <select onChange={handleCategorySelectChange}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    // onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default CreatePostPage