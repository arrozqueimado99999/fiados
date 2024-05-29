import { TbDots, TbHome, TbTrash } from 'react-icons/tb';
import { Dropdown } from 'rsuite';
import { marcarComoPago, deleteConta } from '../model/contas.js';

function Dropdown(contaid) {
    const handleDeleteConta = (contaid, v, n) =>{
        deleteConta(contaid, v, n)
    }

    return (
        <Dropdown title={TbDots}>
            <Dropdown.Item>
                <TbTrash/>
                Apagar
                </Dropdown.Item>
        </Dropdown>
    );
}

export default Dropdown;