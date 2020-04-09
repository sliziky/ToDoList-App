import React, {useState} from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

interface IDropDownProps {
    filter : string;
    setFilter : (filter : string) => void;
}

const DropDownMenu = (props : IDropDownProps) => {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const choices : string[] = ["All", "Active", "Completed"];

    const onChoiceClick = (item : string) => {
        props.setFilter(item);
    }

    return (
        <>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
            {props.filter}
        </DropdownToggle>
        <DropdownMenu>

        {choices.map((item: string, i: any) => (
          <DropdownItem key={i} onClick={() => onChoiceClick(item)}>{item}</DropdownItem>
        ))}
        </DropdownMenu>
      </ButtonDropdown>
      </>
    );
}

export default DropDownMenu;