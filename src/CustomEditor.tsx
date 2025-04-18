
import { RichTextEditor, Link , getTaskListExtension} from '@mantine/tiptap'
import { Editor, useEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import TipTapTaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item';
import { Button } from '@mantine/core'

import {v4 as uuidv4} from 'uuid';

import {IconDeviceFloppy} from '@tabler/icons-react';

import { addNote, getAllNotes, deleteNote, Note } from './db';

const content =
    "<h2 style=\"text-align: center\">Welcome to Offline editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://tiptap.dev/\">Tiptap.dev</a> and supports all of its features:</p><ul><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s></p></li></ul><ul class=\"m_8b44009a mantine-RichTextEditor-taskList\" data-type=\"taskList\"><li class=\"test-item\" data-checked=\"false\" data-type=\"taskItem\"><label><input type=\"checkbox\"><span></span></label><div><p>Create Lists</p><ul class=\"m_8b44009a mantine-RichTextEditor-taskList\" data-type=\"taskList\"><li class=\"test-item\" data-checked=\"false\" data-type=\"taskItem\"><label><input type=\"checkbox\"><span></span></label><div><p>Bullets</p><ul class=\"m_8b44009a mantine-RichTextEditor-taskList\" data-type=\"taskList\"><li class=\"test-item\" data-checked=\"false\" data-type=\"taskItem\"><label><input type=\"checkbox\"><span></span></label><div><p>Nested Lists</p></div></li></ul></div></li></ul></div></li></ul>";

function CustomEditor() {

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            getTaskListExtension(TipTapTaskList),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                  class: 'test-item',
                },
              }),
        ],
        content,
    });

    function handleSave() {
        addNote({id: uuidv4(), date: new Date().toLocaleString() , content: editor?.getText()!, html: editor?.getHTML()!})
    }

    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.TaskList />
                    <RichTextEditor.TaskListLift />
                    <RichTextEditor.TaskListSink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>

                <IconDeviceFloppy onClick={handleSave}></IconDeviceFloppy>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    );
}

export default CustomEditor