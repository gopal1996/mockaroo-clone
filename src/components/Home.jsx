import React, {useState} from 'react'
import { CloseOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid'

import { Select, Input, Button, Divider, Typography  } from 'antd';

import "../styles/home.css"

const { Option } = Select;
const { Text } = Typography;

let fieldType = [
    "First_Name",
    "Last_Name",
    "Email_address",
    "Mobile_Number",
    "Gender",
    "Company"
]

export const Home = () => {
    const [fieldList, setFieldList] = useState([
        {
            id: "1",
            fieldName: "First Name",
            type: "First_Name",
            formula: ""
        },
        {
            id: "2",
            fieldName: "Last Name",
            type: "Last_Name",
            formula: ""
        },
        {
            id: "3",
            fieldName: "Email",
            type: "Email_address",
            formula: ""
        },
    ])

    const [rows, setRows] = useState(1000)

    const onAddField = () => {
        let newId = nanoid(5)
        let lastFieldValue = fieldList.slice(-1)[0]

        setFieldList(prevState => [...prevState, {...lastFieldValue, id: newId}])
    }

    const onRemoveField = (id) => {
        let newFieldList = fieldList.filter(field => field.id !== id)
        setFieldList(newFieldList)
    }

    const onChangeValue = (id, field, value) => {
        let fieldIndex = fieldList.findIndex(item => item.id === id)
        let newField = {...fieldList[fieldIndex], [field]: value}
        setFieldList(prevState => [
            ...prevState.slice(0, fieldIndex),
            newField,
            ...prevState.slice(fieldIndex + 1)
        ])
    }

    const onDownload = () => {
        alert(JSON.stringify(fieldList))
    }

    return (
        <div className="container">
            <div className="header">
                <h4 className="header__field">Field Name</h4>
                <h4 className="header__field">Type</h4>
                <h4 className="header__field">Formula</h4>
            </div>
            <div className="input__wrap">
                {
                    fieldList.map(field => (
                        <div className="input__list" key={field.id}>
                            <Input placeholder="Field Name" value={field.fieldName} onChange={(e) => onChangeValue(field.id, "fieldName", e.target.value)} />
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Type"
                                value={field.type}
                                onChange={(value) => onChangeValue(field.id, "type", value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {
                                    fieldType.map((type,idx) => <Option key={idx} value={type}>{type}</Option>)
                                }
                            </Select>
                            <Input placeholder="Formula" value={field.formula} onChange={(e) => onChangeValue(field.id, "formula", e.target.value)} />
                            <CloseOutlined onClick={() => onRemoveField(field.id)} />
                        </div>
                    ))
                }
                
            </div>
            <div className="controller">
                <Button ghost onClick={onAddField}>Add another field</Button>
            </div>
            <Divider style={{background:"#fff"}} />
            <div className="row__controller">
                <Text type="success">Rows</Text>
                <Input placeholder="Rows" style={{width: "12rem", marginLeft: "8px"}} value={rows} onChange={(e) => setRows(e.target.value)} />
                <Button ghost onClick={onDownload} style={{height: "39px", marginLeft: "1rem"}}>Download</Button>
            </div>
            <Divider style={{background:"#fff"}} />
        </div>
    )
}
