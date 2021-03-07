import React, {useContext, useState, useEffect, useRef, SyntheticEvent} from 'react';
import {Table, Input, Form} from 'antd';
import styles from "./Request.module.less";
import {CloseOutlined} from '@ant-design/icons';

const EditableContext = React.createContext<any>(null);
const DataSourceContext = React.createContext<dtType>({});

type dtType = {
  dataSource?: DataType[]
  add?: () => void
}

interface Item {
  key: string;
  name: string;
  value: string;
  description: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  const [form] = Form.useForm();
  const [untouched, setUntouched] = useState(true);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{form, untouched, setUntouched}}>
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

const EditableCell: React.FC<EditableCellProps> =
  ({
     title,
     editable,
     children,
     dataIndex,
     record,
     handleSave,
     ...restProps
   }) => {
    const inputRef = useRef<Input>(null);
    const {form, untouched, setUntouched} = useContext(EditableContext)!;
    const {add} = useContext(DataSourceContext)!;

    useEffect(() => {
      if (record){
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
      }
    }, [dataIndex, record]);

    const input = (e: SyntheticEvent) => {
      if (untouched) {
        add ? add() : console.log("add not ready")
        setUntouched(false);
      }
    }

    const save = async () => {
      try {
        const values = await form.validateFields();
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
        >
          <Input
            ref={inputRef}
            size="small"
            onInput={input}
            onBlur={save}
            placeholder={dataIndex}
            autoComplete='off'
          />
        </Form.Item>
    }

    return <td {...restProps}>{childNode}</td>;
  };

type EditableTableProps = {
  dataSource: DataType[];
  setDataSource: (data: DataType[]) => void;
  count: number;
  setCount: (count: number) => void;
};

export interface DataType {
  key: React.Key;
  name: string;
  value: string;
  description: string;
}

interface EditableTableState {
}

type ColumnTypes = Exclude<Parameters<typeof Table>[0]['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {

  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = [
      {
        title: 'NAME',
        dataIndex: 'name',
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
        title: '',
        dataIndex: 'operation',
        width: '3%',
        render: (_, record: any, index: number) => {
          return index !== this.props.dataSource.length - 1 ? (
            <a onClick={() => this.handleDelete(record.key)}>&nbsp;&nbsp;<CloseOutlined/></a>
          ) : null;
        }
      }
    ];

    this.state = {
      dataSource: [{key: -1, name: '', value: '', description: ''}],
      count: 0,
    };
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.props.dataSource];
    this.setState({dataSource: dataSource.filter(item => item.key !== key)});
  };

  handleAdd = () => {
    const {count, dataSource} = this.props;
    const newData: DataType = {
      key: count,
      name: '',
      value: '',
      description: '',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row: DataType) => {
    const newData = [...this.props.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({dataSource: newData});
  };

  render() {
    const {dataSource} = this.props;
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
        <div className={styles.paramTable}>
          <DataSourceContext.Provider value={{dataSource, add: () => this.handleAdd()}}>
            <Table
              size="small"
              pagination={false}
              components={components}
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