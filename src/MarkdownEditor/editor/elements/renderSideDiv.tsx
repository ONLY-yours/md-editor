import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, {
  CSSProperties,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Editor, Path } from 'slate';
import { ReactEditor } from 'slate-react';
import { addSelection } from '../plugins/selection';
import { useEditorStore } from '../store';
type ActivationType = 'none' | 'half' | 'full';
type AbstractSideDivProps = {
  index: number;
  type: 'column' | 'row';
  divStyle: CSSProperties;
  activationArr: ActivationType[];
  getTableNode: any;
  setSelCells: any;
  scrollContainerRefDom?: HTMLElement;
  [key: string]: any;
  tableDom: any;
  activeDeleteBtn: string | null;
  setActiveDeleteBtn: any;
};
export function AbstractSideDiv(props: AbstractSideDivProps) {
  const {
    index,
    type,
    divStyle,
    getTableNode,
    setSelCells,
    activationArr,
    tableDom,
    activeDeleteBtn,
    setActiveDeleteBtn,
  } = props;

  const isColumn = type === 'column';
  const { store } = useEditorStore();
  const tableSideDivRef = useRef<HTMLDivElement | null>(null);
  const [deleteBtnHover, setDeleteBtnHover] = useState(false);
  const [addBtnHover, setAddBtnHover] = useState(false);
  const [overlayPos, setOverlayPos] = useState({
    left: -999999999,
    top: -999999999,
  });
  const [addBtnPos, setAddBtnPos] = useState({
    left: -999999999,
    top: -999999999,
  });

  useEffect(() => {
    if (!store.editor) return;
    const selectedCells = tableDom.querySelectorAll('.selected-cell-td');
    if (deleteBtnHover) {
      selectedCells.forEach(
        (cell: { classList: { add: (arg0: string) => void } }) => {
          cell.classList.add('delete-btn-hover');
        },
      );
    } else {
      selectedCells.forEach(
        (cell: { classList: { remove: (arg0: string) => void } }) => {
          cell.classList.remove('delete-btn-hover');
        },
      );
    }
  }, [deleteBtnHover]);

  useEffect(() => {
    if (!tableSideDivRef?.current || !activeDeleteBtn) return;

    const { left, top, right } =
      tableSideDivRef.current.getBoundingClientRect();

    const domPos = isColumn
      ? { left: (right + left) / 2 - 74, top: top - 64 }
      : { left: right - 36, top: top - 70 };

    setOverlayPos(domPos);
  }, [deleteBtnHover, activeDeleteBtn]);

  useEffect(() => {
    if (!tableSideDivRef?.current) return;

    const { left, top, right, bottom } =
      tableSideDivRef.current.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      let newAddPos: { left: number; top: number } | undefined;

      if (isColumn) {
        const middle = left + (right - left) / 2;
        const isLeftZone = e.clientX < middle;
        newAddPos = isLeftZone
          ? { left: (right + left) / 2 - 118, top: top - 64 } // 左
          : { left: (right + left) / 2 - 30, top: top - 64 }; // 右
      } else if (type === 'row') {
        const middle = top + (bottom - top) / 2;
        const isTopZone = e.clientY < middle;
        newAddPos = isTopZone
          ? { left: right - 90, top: top - 64 } // 上
          : { left: right - 90, top: top - 34 }; // 下
      }

      if (newAddPos) {
        setAddBtnPos(newAddPos);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tableSideDivRef, isColumn, type, setAddBtnPos]);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      tableSideDivRef.current &&
      !tableSideDivRef.current.contains(event.target as Node)
    ) {
      setActiveDeleteBtn(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={tableSideDivRef}
        key={index}
        contentEditable={false}
        suppressContentEditableWarning
        className={`table-side-div ignore-toggle-readonly ${
          activationArr[index] === 'full'
            ? 'full-active'
            : activationArr[index] === 'half'
            ? 'half-active'
            : 'none-active'
        } ${deleteBtnHover ? 'delete-btn-hover' : ''} `}
        style={{
          ...divStyle,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setActiveDeleteBtn(`${type}-${index}`);
          const tableSlateNode = getTableNode();
          if (tableSlateNode && index !== -1) {
            const tablePath = ReactEditor.findPath(
              store.editor,
              tableSlateNode,
            );
            const tableEntry = Editor.node(store.editor, tablePath);
            const len = isColumn
              ? (tableSlateNode.children as Array<any>).length
              : (tableSlateNode.children as Array<any>)[0].children.length;
            const startPath = isColumn
              ? [...tablePath, 0, index]
              : [tablePath[0], 1, index, 0];
            const endPath = isColumn
              ? [...tablePath, len - 1, index]
              : [tablePath[0], 1, index, len - 1];
            addSelection(store, tableEntry, startPath, endPath, setSelCells);
          }
        }}
        onMouseEnter={() => setAddBtnHover(true)}
        onMouseLeave={() => setAddBtnHover(false)}
      ></div>
      {activeDeleteBtn === `${type}-${index}` && (
        <Button
          className="table-delete-btn"
          onMouseEnter={() => setDeleteBtnHover(true)}
          onMouseLeave={() => setDeleteBtnHover(false)}
          style={{
            position: 'absolute',
            height: '2em',
            width: '2em',
            left: overlayPos.left,
            top: overlayPos.top,
          }}
        >
          <DeleteOutlined />
        </Button>
      )}
      {addBtnHover && (
        <Button
          className="table-add-row-btn"
          style={{
            position: 'absolute',
            zIndex: 101,
            height: '2em',
            width: '2em',
            left: addBtnPos.left,
            top: addBtnPos.top,
          }}
        >
          <PlusOutlined />
        </Button>
      )}
    </>
  );
}
export function RowSideDiv(props: {
  tableRef: any;
  getTableNode: any;
  setSelCells: any;
  selCells: any;
  activeDeleteBtn: string | null;
  setActiveDeleteBtn: any;
}) {
  const {
    tableRef,
    getTableNode,
    selCells,
    setSelCells,
    activeDeleteBtn,
    setActiveDeleteBtn,
  } = props;
  const [activationArr, setActivationArr] = useState<ActivationType[]>([]);
  const tableDom = (tableRef as any)?.current?.childNodes[0];
  const [rowDomArr, setRowDomArr] = useState(
    Array.from(tableDom?.children || []),
  );

  useEffect(() => {
    const rowMap: { [key: number]: number } = {};
    const arr: SetStateAction<ActivationType[]> = [];
    const tableSlateNode = getTableNode();
    selCells.forEach((cellEntry: [any, any]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, path] = cellEntry;
      const rowIndex = path[2];
      if (rowMap[rowIndex]) {
        rowMap[rowIndex]++;
      } else {
        rowMap[rowIndex] = 1;
      }
    });
    for (let i in rowMap) {
      if (rowMap.hasOwnProperty(i)) {
        arr[i] =
          rowMap[i] === tableSlateNode.children[0].children.length
            ? 'full'
            : rowMap[i] === 0
            ? 'none'
            : 'half';
      }
    }
    setActivationArr(arr);
  }, [JSON.stringify(selCells.map((cell: Path) => cell[1]))]);
  useEffect(() => {
    if (tableDom) {
      setRowDomArr(Array.from(tableDom.children || []));
    }
  }, [tableDom]);
  return (
    <div
      className="row-div-bar-inner ignore-toggle-readonly"
      style={{
        position: 'absolute',
        display: 'block',
        zIndex: 200,
        width: '0.9em',
        marginTop: '16px',
        marginLeft: '-16px',
      }}
      contentEditable={false}
    >
      {rowDomArr?.map((tr: any, index: number) => (
        <AbstractSideDiv
          tableDom={tableDom}
          key={index}
          index={index}
          type={'row'}
          divStyle={{
            position: 'relative',
            width: '14px',
            height:
              index === 0
                ? tr?.getBoundingClientRect?.()?.height - 1.66 ||
                  tr?.clientHeight - 2
                : tr?.getBoundingClientRect?.()?.height - 0.66 ||
                  tr?.clientHeight - 1,
            ...(index === rowDomArr.length - 1 && {
              borderBottomLeftRadius: '0.5em',
            }),
          }}
          getTableNode={getTableNode}
          activationArr={activationArr}
          setSelCells={setSelCells}
          activeDeleteBtn={activeDeleteBtn}
          setActiveDeleteBtn={setActiveDeleteBtn}
        />
      ))}
    </div>
  );
}
export function ColSideDiv(props: {
  activeDeleteBtn: string | null;
  setActiveDeleteBtn: any;
  tableRef: any;
  getTableNode: any;
  setSelCells: any;
  selCells: any;
}) {
  const {
    tableRef,
    getTableNode,
    selCells,
    setSelCells,
    activeDeleteBtn,
    setActiveDeleteBtn,
  } = props;
  const colDivBarInnerRef = useRef<HTMLDivElement | null>(null);
  const [activationArr, setActivationArr] = useState<ActivationType[]>([]);
  const tableDom = (tableRef as any)?.current?.childNodes[0];
  const [colDomArr, setColDomArr] = useState(
    tableDom ? Array.from(tableDom?.firstChild?.children || []) : [],
  );
  const [scrollOffset, setScrollOffset] = useState(0);
  useEffect(() => {
    const colMap: { [key: number]: number } = {};
    const arr: SetStateAction<ActivationType[]> = [];
    const tableSlateNode = getTableNode();
    selCells.forEach((cellEntry: [any, any]) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, path] = cellEntry;
      const colIndex = path[3];
      if (colMap[colIndex]) {
        colMap[colIndex]++;
      } else {
        colMap[colIndex] = 1;
      }
    });
    for (let i in colMap) {
      if (colMap.hasOwnProperty(i)) {
        arr[i] =
          colMap[i] === tableSlateNode.children.length
            ? 'full'
            : colMap[i] === 0
            ? 'none'
            : 'half';
      }
    }
    setActivationArr(arr);
  }, [JSON.stringify(selCells.map((cell: Path) => cell[1]))]);
  useEffect(() => {
    if (tableDom) {
      setColDomArr(Array.from(tableDom.firstChild.children || []));
    }
  }, [tableDom]);
  useEffect(() => {
    if (!tableRef.current) return;
    const tableElement = tableRef.current;
    const handleScroll = () => {
      setScrollOffset(tableElement.scrollLeft);
    };
    tableElement.addEventListener('scroll', handleScroll);
    return () => {
      tableElement.removeEventListener('scroll', handleScroll);
    };
  }, [tableRef]);
  return (
    <div
      ref={colDivBarInnerRef}
      className="col-div-bar-inner ignore-toggle-readonly"
      style={{
        position: 'absolute',
        display: 'flex',
        height: '1rem',
        zIndex: 100,
        transform: `translateX(${scrollOffset / 9999}px)`,
      }}
      contentEditable={false}
    >
      {colDomArr?.map((td: any, index: number) => {
        const colRect = td?.getBoundingClientRect();
        const leftPosition = colRect?.left || 0;
        return (
          <AbstractSideDiv
            tableDom={tableDom}
            key={index}
            index={index}
            type={'column'}
            divStyle={{
              position: 'absolute',
              top: 0,
              left: leftPosition - 59,
              width: colRect?.width || td?.clientWidth,
              height: '0.9em',
              zIndex: 101,
              ...(index === colDomArr.length - 1 && {
                borderTopRightRadius: '0.5em',
              }),
            }}
            getTableNode={getTableNode}
            activationArr={activationArr}
            setSelCells={setSelCells}
            activeDeleteBtn={activeDeleteBtn}
            setActiveDeleteBtn={setActiveDeleteBtn}
          />
        );
      })}
    </div>
  );
}
export function IntersectionPointDiv(props: {
  getTableNode: any;
  setSelCells: any;
  selCells: any;
}) {
  const { getTableNode, setSelCells, selCells } = props;
  const { store } = useEditorStore();
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    let act = false;
    const tableSlateNode = getTableNode();
    const total =
      tableSlateNode.children.length *
      tableSlateNode.children[0].children.length;
    if (selCells.length === total) {
      act = true;
    }
    setActive(act);
  }, [JSON.stringify(selCells.map((cell: Path) => cell[1]))]);
  return (
    <div
      contentEditable={false}
      suppressContentEditableWarning
      className={`intersection-point ignore-toggle-readonly ${
        active ? 'active' : ''
      }`}
      style={{
        display: 'flex',
        zIndex: 102,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        const tableSlateNode = getTableNode();
        if (tableSlateNode) {
          const tablePath = ReactEditor.findPath(store.editor, tableSlateNode);
          const tableEntry = Editor.node(store.editor, tablePath);
          const colLen = (tableSlateNode.children as Array<any>).length;
          const rowLen = (tableSlateNode.children as Array<any>)[0].children
            .length;
          const startPath = [tablePath[0], 1, 0, 0];
          const endPath = [tablePath[0], 1, colLen - 1, rowLen - 1];
          addSelection(store, tableEntry, startPath, endPath, setSelCells);
        }
      }}
    ></div>
  );
}
