import { useState } from 'react';

import {
    IconDots,
    IconMessages,
    IconNote,
    IconPencil,
    IconReportAnalytics,
    IconTrash,
  } from '@tabler/icons-react';
  import { ActionIcon, Avatar, Group, Menu, Table, Text, Checkbox} from '@mantine/core';

import { addNote, getAllNotes, deleteNote, Note } from './db';

function CustomTable(props: any) {

    const CHAR_LIMIT:number = 10;

    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    
    function ellipseString(str:string) {
        return str.length > CHAR_LIMIT? str.substring(0, CHAR_LIMIT) + `...` : str;
    }

    function handleDelete(id: string) {
        deleteNote(id);
    }

    const rows = props.notes.map((note: Note) => (
        <Table.Tr
            key={note.id}
            bg={selectedRows.includes(note.id) ? 'var(--mantine-color-blue-light)' : undefined}
        >
            <Table.Td>
                <Checkbox
                    aria-label="Select row"
                    checked={selectedRows.includes(note.id)}
                    onChange={(event) =>
                        setSelectedRows(
                            event.currentTarget.checked
                                ? [...selectedRows, note.id]
                                : selectedRows.filter((id) => id !== note.id)
                        )
                    }
                />
            </Table.Td>
            {/* <Table.Td>{note.id}</Table.Td> */}
            <Table.Td>{note.date}</Table.Td>
            <Table.Td>{ellipseString(note.content)}</Table.Td>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <Menu
                        transitionProps={{ transition: 'pop' }}
                        withArrow
                        position="bottom-end"
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots size={16} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconMessages size={16} stroke={1.5} />}>Send note</Menu.Item>
                            <Menu.Item leftSection={<IconNote size={16} stroke={1.5} />}>Add note</Menu.Item>
                            <Menu.Item leftSection={<IconTrash size={16} stroke={1.5} />} color="red" onClick={() => handleDelete(note.id)}>Delete note</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th />
                    {/* <Table.Th>#</Table.Th> */}
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Content</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

export default CustomTable