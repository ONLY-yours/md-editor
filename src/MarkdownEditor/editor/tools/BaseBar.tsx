﻿import {
  BoldOutlined,
  ClearOutlined,
  ItalicOutlined,
  LinkOutlined,
  PlusCircleFilled,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { ColorPicker, Divider, Dropdown } from 'antd';
import classnames from 'classnames';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Editor, Element, NodeEntry } from 'slate';
import { keyTask$ } from '../../index';
import { useEditorStore } from '../store';
import { EditorUtils } from '../utils/editorUtils';
import { getInsertOptions } from './InsertAutocomplete';

const HeatTextMap = {
  1: '主标题',
  2: '段标题',
  3: '小标题',
};

const LineCode = () => {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" width="1.3em" height="1.3em">
      <path
        fill="currentColor"
        d="M153.770667 517.558857l200.387047-197.241905L302.86019 268.190476 48.761905 518.290286l254.439619 243.614476 50.590476-52.833524-200.021333-191.512381zM658.285714 320.316952L709.583238 268.190476l254.098286 250.09981L709.241905 761.904762l-50.590476-52.833524 200.021333-191.512381L658.285714 320.316952z m-112.981333-86.186666L393.99619 785.554286l70.534096 19.358476 151.30819-551.399619-70.534095-19.358476z"
      />
    </svg>
  );
};

const tools = [
  {
    key: 'bold',
    type: 'bold',
    icon: (<BoldOutlined />) as React.ReactNode,
  },
  {
    key: 'italic',
    type: 'italic',
    icon: <ItalicOutlined />,
  },
  {
    key: 'strikethrough',
    type: 'strikethrough',
    icon: <StrikethroughOutlined />,
  },
  {
    key: 'inline-code',
    type: 'code',
    icon: <LineCode />,
  },
];

const colors = [
  { color: 'rgba(16,185,129,1)' },
  { color: 'rgba(245,158,11,1)' },
  { color: 'rgba(59,130,246,1)' },
  { color: 'rgba(156,163,175,.8)' },
  { color: 'rgba(99,102, 241,1)' },
  { color: 'rgba(244,63,94,1)' },
  { color: 'rgba(217,70,239,1)' },
  { color: 'rgba(14, 165, 233, 1)' },
];

export type ToolsKeyType =
  | 'redo'
  | 'undo'
  | 'clear'
  | 'head'
  | 'divider'
  | 'color'
  | 'table'
  | 'column'
  | 'quote'
  | 'code'
  | 'b-list'
  | 'n-list'
  | 't-list'
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'inline-code'
  | 'divider'
  | 'link';

/**
 * 基础工具栏
 * @param props
 * @returns
 */
export const BaseToolBar = observer(
  (props: {
    prefix?: string;
    showInsertAction?: boolean;
    extra?: React.ReactNode[];
    min?: boolean;
    hideTools?: ToolsKeyType[];
    showEditor?: boolean;
  }) => {
    const store = useEditorStore();

    const [, setRefresh] = React.useState(false);
    const [highColor, setHighColor] = React.useState<string | null>(null);

    const el = useRef<NodeEntry<any>>();

    const openLink = useCallback(() => {
      const sel = store.editor.selection!;
      el.current = Editor.parent(store.editor, sel.focus.path);
      store.highlightCache.set(el.current[0], [{ ...sel, highlight: true }]);
      store.openInsertLink$.next(sel);
      runInAction(() => {
        store.refreshHighlight = !store.refreshHighlight;
        store.openLinkPanel = true;
      });
    }, []);

    useEffect(() => {
      setRefresh((r) => !r);
    }, [store.refreshFloatBar]);

    /**
     * 获取当前节点
     */
    const [node] = Editor.nodes<any>(store.editor, {
      match: (n) => Element.isElement(n),
      mode: 'lowest',
    });

    /**
     * 插入操作，一般而言不需要作什么特殊设置
     */
    const insert = useCallback((op: any) => {
      if (!op) {
        return;
      }
      keyTask$.next({
        key: op.task,
        args: op.args,
      });
    }, []);

    useEffect(() => {
      if (typeof localStorage === 'undefined') return undefined;
      setHighColor(localStorage.getItem('high-color'));
    }, [EditorUtils.isFormatActive(store.editor, 'highColor')]);

    const baseClassName = props.prefix || `toolbar-action`;

    const insertOptions = useMemo(
      () =>
        props.showInsertAction
          ? getInsertOptions({
              isTop: false,
            })
              .map((o) => o.children)
              .flat(1)
              .filter((o) => {
                if (!store.editorProps?.image && o.task === 'uploadImage') {
                  return false;
                }
                return true;
              })
          : [],
      [store.editorProps],
    );

    const listDom = useMemo(() => {
      const options = insertOptions.map((t) => {
        return (
          <div
            role="button"
            key={t.key}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              insert(t);
            }}
            className={`${baseClassName}-item`}
          >
            {t.icon}
          </div>
        );
      });

      let list = [];

      if (props.showEditor) {
        list.push(
          <div
            role="button"
            key="redo"
            className={`${baseClassName}-item`}
            onClick={() => {
              keyTask$.next({
                key: 'redo',
                args: [],
              });
            }}
          >
            <RedoOutlined />
          </div>,
        );
        list.push(
          <div
            role="button"
            key="undo"
            className={`${baseClassName}-item`}
            onClick={() => {
              keyTask$.next({
                key: 'undo',
                args: [],
              });
            }}
          >
            <UndoOutlined />
          </div>,
        );
        list.push(
          <div
            role="button"
            key="clear"
            className={`${baseClassName}-item`}
            onClick={() => {
              EditorUtils.clearMarks(store.editor, true);
              EditorUtils.highColor(store.editor);
            }}
          >
            <ClearOutlined />
          </div>,
        );
        if (['head', 'paragraph'].includes(node?.[0]?.type)) {
          list.push(
            <Dropdown
              key="head"
              menu={{
                items: ['H1', 'H2', 'H3'].map((item, index) => {
                  return {
                    label: HeatTextMap[item.replace('H', '') as '1'] || item,
                    key: item,
                    onClick: () => {
                      keyTask$.next({
                        key: 'head',
                        args: [index + 1],
                      });
                    },
                  };
                }),
              }}
            >
              <div
                role="button"
                className={`${baseClassName}-item`}
                style={{
                  minWidth: 36,
                  textAlign: 'center',
                  fontSize: 12,
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                {node?.[0]?.level
                  ? `${
                      HeatTextMap[(node[0].level + '') as '1'] ||
                      `H${node[0].level}`
                    }`
                  : '正文'}
              </div>
            </Dropdown>,
          );
        }
      }
      if (list.length > 0) {
        list.push(
          <Divider
            key="divider"
            type="vertical"
            style={{
              margin: '0 4px',
              height: '18px',
              borderColor: 'rgba(0,0,0,0.15)',
            }}
          />,
        );
      }

      list.push(
        <div
          key="color"
          role="button"
          className={`${baseClassName}-item`}
          style={{
            position: 'relative',
          }}
        >
          <ColorPicker
            style={{
              position: 'absolute',
              opacity: 0,
              top: 0,
              left: 0,
            }}
            size="small"
            value={highColor}
            presets={[
              {
                label: 'Colors',
                colors: colors.map((c) => c.color),
              },
            ]}
            onChange={(e) => {
              localStorage.setItem('high-color', e.toHexString());
              EditorUtils.highColor(store.editor, e.toHexString());
              setHighColor(e.toHexString());
              setRefresh((r) => !r);
            }}
          />
          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              fontWeight: EditorUtils.isFormatActive(store.editor, 'highColor')
                ? 'bold'
                : undefined,
              textDecoration: 'underline solid ' + highColor,
              textDecorationLine: 'underline',
              textDecorationThickness: 2,
              lineHeight: 1,
            }}
            role="button"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={() => {
              if (EditorUtils.isFormatActive(store.editor, 'highColor')) {
                EditorUtils.highColor(store.editor);
              } else {
                EditorUtils.highColor(store.editor, highColor || '#10b981');
              }
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                textAlign: 'center',
                marginTop: -1,
              }}
            >
              A
            </span>
          </div>
        </div>,
      );

      list = list.concat(options);

      tools.forEach((tool) => {
        list.push(
          <div
            role="button"
            key={tool.key}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              EditorUtils.toggleFormat(store.editor, tool.type);
            }}
            className={`${baseClassName}-item`}
            style={{
              color: EditorUtils.isFormatActive(store.editor, tool.type)
                ? '#1677ff'
                : undefined,
            }}
          >
            {tool.icon}
          </div>,
        );
      });

      if (['head', 'paragraph'].includes(node?.[0]?.type)) {
        list.push(
          <Divider
            key="divider"
            type="vertical"
            style={{
              margin: '0 4px',
              height: '18px',
              borderColor: 'rgba(0,0,0,0.15)',
            }}
          />,
        );
        list.push(
          <div
            key="link"
            role="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              openLink();
            }}
            className={`${baseClassName}-item`}
            style={{
              color: EditorUtils.isFormatActive(store.editor, 'url')
                ? '#1677ff'
                : undefined,
            }}
          >
            <LinkOutlined />
          </div>,
        );
      }
      if (props.hideTools) {
        list = list.filter((l) => {
          return !props?.hideTools?.includes(l.key as ToolsKeyType);
        });
      }
      return list;
    }, [insertOptions, props.showEditor, node, props.hideTools]);

    const headDom = (
      <>
        {props.showEditor ? (
          <>
            <div
              role="button"
              className={`${baseClassName}-item`}
              onClick={() => {
                keyTask$.next({
                  key: 'redo',
                  args: [],
                });
              }}
            >
              <RedoOutlined />
            </div>
            <div
              role="button"
              className={`${baseClassName}-item`}
              onClick={() => {
                keyTask$.next({
                  key: 'undo',
                  args: [],
                });
              }}
            >
              <UndoOutlined />
            </div>
          </>
        ) : null}
        <div
          role="button"
          className={`${baseClassName}-item`}
          onClick={() => {
            EditorUtils.clearMarks(store.editor, true);
            EditorUtils.highColor(store.editor);
          }}
        >
          <ClearOutlined />
        </div>
        {['head', 'paragraph'].includes(node?.[0]?.type) ? (
          <>
            <Divider
              type="vertical"
              style={{
                margin: '0 4px',
                height: '18px',
                borderColor: 'rgba(0,0,0,0.15)',
              }}
            />
            <Dropdown
              menu={{
                items: ['H1', 'H2', 'H3'].map((item, index) => {
                  return {
                    label: HeatTextMap[item.replace('H', '') as '1'] || item,
                    key: item,
                    onClick: () => {
                      keyTask$.next({
                        key: 'head',
                        args: [index + 1],
                      });
                    },
                  };
                }),
              }}
            >
              <div
                role="button"
                className={`${baseClassName}-item`}
                style={{
                  minWidth: 36,
                  textAlign: 'center',
                  fontSize: node?.[0]?.level ? 14 : 12,
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                {node?.[0]?.level
                  ? `${
                      HeatTextMap[(node[0].level + '') as '1'] ||
                      `H${node[0].level}`
                    }`
                  : '正文'}
              </div>
            </Dropdown>
            <div
              key="color"
              role="button"
              className={`${baseClassName}-item`}
              style={{
                position: 'relative',
              }}
            >
              <ColorPicker
                style={{
                  position: 'absolute',
                  opacity: 0,
                  top: 0,
                  left: 0,
                }}
                size="small"
                value={highColor}
                presets={[
                  {
                    label: 'Colors',
                    colors: colors.map((c) => c.color),
                  },
                ]}
                onChange={(e) => {
                  localStorage.setItem('high-color', e.toHexString());
                  EditorUtils.highColor(store.editor, e.toHexString());
                  setHighColor(e.toHexString());
                  setRefresh((r) => !r);
                }}
              />
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  alignItems: 'center',
                  fontWeight: EditorUtils.isFormatActive(
                    store.editor,
                    'highColor',
                  )
                    ? 'bold'
                    : undefined,
                  textDecoration: 'underline solid ' + highColor,
                  textDecorationLine: 'underline',
                  textDecorationThickness: 2,
                  lineHeight: 1,
                }}
                role="button"
                onMouseEnter={(e) => e.stopPropagation()}
                onClick={() => {
                  if (EditorUtils.isFormatActive(store.editor, 'highColor')) {
                    EditorUtils.highColor(store.editor);
                  } else {
                    EditorUtils.highColor(store.editor, highColor || '#10b981');
                  }
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 16,
                    height: 16,
                    textAlign: 'center',
                    marginTop: -1,
                  }}
                >
                  A
                </span>
              </div>
            </div>
            {tools.map((tool) => {
              return (
                <div
                  role="button"
                  key={tool.key}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    EditorUtils.toggleFormat(store.editor, tool.type);
                  }}
                  className={`${baseClassName}-item`}
                  style={{
                    color: EditorUtils.isFormatActive(store.editor, tool.type)
                      ? '#1677ff'
                      : undefined,
                  }}
                >
                  {tool.icon}
                </div>
              );
            })}
          </>
        ) : null}
      </>
    );

    const minTools = useMemo(() => {
      if (!props.min) return null;
      return (
        <>
          <div
            role="button"
            className={classnames(
              `${baseClassName}-item`,
              `${baseClassName}-item-min-plus-icon`,
            )}
          >
            <Dropdown
              menu={{
                items: insertOptions.map((t) => {
                  return {
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        {t.icon}
                        {t.label?.at(0)}
                      </div>
                    ),
                    key: t.key,
                    onClick: () => {
                      insert(t);
                    },
                  };
                }),
              }}
            >
              <PlusCircleFilled />
            </Dropdown>
          </div>
          <Divider
            type="vertical"
            style={{
              margin: '0 4px',
              height: '18px',
              borderColor: 'rgba(0,0,0,0.15)',
            }}
          />
          {headDom}
        </>
      );
    }, [insertOptions, props.min, node]);

    return (
      <div
        style={{
          display: 'flex',
          height: '100%',
          gap: '1px',
          alignItems: 'center',
        }}
      >
        {props.min ? minTools : listDom}

        {props.extra ? (
          <>
            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {props.extra?.map((item, index) => {
                if (React.isValidElement(item)) {
                  if (item.type === 'span') {
                    <div className={`${baseClassName}-item`} key={index}>
                      {item}
                    </div>;
                  }
                  return item;
                }
                return (
                  <div className={`${baseClassName}-item`} key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    );
  },
);
