import React, {useContext, useState, useEffect, useRef} from 'react';
import {Table, Input, Button, Popconfirm, Form, Row, Col} from 'antd';
import {FormInstance} from 'antd/lib/form';
import styles from "./Request.module.less";
import {DashboardOutlined} from "@ant-design/icons";

const EditableContext = React.createContext<FormInstance<any> | null>(null);
const DataSourceContext = React.createContext<dtType>({});

type dtType = {
  dataSource?: DataType[]
  add?: () => void
}

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                     title,
                                                     editable,
                                                     children,
                                                     dataIndex,
                                                     record,
                                                     handleSave,
                                                     ...restProps
                                                   }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;
  const {add} = useContext(DataSourceContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({[dataIndex]: record[dataIndex]});
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode =
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} size="small"/>
      </Form.Item>
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  dataKey: string;
  value: string;
  description: string;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: 'KEY',
        dataIndex: 'dataKey',
        width: '30%',
        editable: true,
      },
      {
        title: 'VALUE',
        dataIndex: 'value',
        editable: true,
      },
      {
        title: 'DESCRIPTION',
        dataIndex: 'description',
        editable: true,
      },
      {
        title: 'OPERATION',
        dataIndex: 'operation',
        render: (_, record: any) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [{key: '', dataKey: '', value: '', description: ''}],
      count: 0,
    };
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource: dataSource.filter(item => item.key !== key)});
  };

  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData: DataType = {
      key: count,
      dataKey: '',
      value: '',
      description: '',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({dataSource: newData});
  };

  render() {
    const {dataSource} = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Row>
          <Col span={1}>
            <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 10}} size={"small"}>
              Add
            </Button>
          </Col>
        </Row>
        <div style={{textAlign: "center"}}>
          <DataSourceContext.Provider value={{dataSource, add: () => this.handleAdd()}}>
            <Table
              size="small"
              pagination={false}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              dataSource={dataSource}
              columns={columns as ColumnTypes}
            />
          </DataSourceContext.Provider>
        </div>
      </div>
    );
  }
}

export default EditableTable;