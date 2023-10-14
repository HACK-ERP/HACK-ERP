import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
"../../services/ClientsService";

const ITEM_HEIGHT = 46;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default function SelectInput({ items, selectItem, handleChange}) {


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          name="client"
          multiple={false}
          displayEmpty
          value={selectItem}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (!selected) {
              return <em>Cliente</em>;
            }
            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Cliente</em>
          </MenuItem>
          {items.map((item) => (
            item.RS
            ?
            <MenuItem key={item.id} value={item.RS}>
              {item.RS}
            </MenuItem>
            :
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>

          ))}
        </Select>
      </FormControl>
    </div>
  );
}
