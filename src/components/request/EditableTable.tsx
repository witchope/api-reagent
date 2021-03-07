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
  age: string;
  address: string;
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

    const input = (e: SyntheticEvent) => {
      if (untouched) {
        add ? add() : console.log("add not ready")
        setUntouched(false);
      }
    }

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
            placeholder={dataIndex}
            autoComplete='off'
          />
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
        dataIndex: 'key',
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
          return index !== this.state.dataSource.length - 1 ? (
            <a onClick={() => this.handleDelete(record.key)}>&nbsp;&nbsp;<CloseOutlined/></a>
          ) : null;
        }
      }
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
        <div className={styles.paramTable}>
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