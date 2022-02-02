import { useState } from 'react';
import {
  Dropdown,
  DropdownList,
  DropdownOption,
  DropdownPosition,
  Input,
  InputWrapper,
  Label,
} from './StyledComponent';
import { templateListData } from './templateListData';

export function TemplateList({
  imageName,
  setImageName,
  suggestions,
  setSuggestions,
  suggestionSelected,
}) {
  const [isFocus, setIsFocus] = useState(false);

  function onTextChanged(event) {
    const searchString = event.currentTarget.value;
    setImageName(searchString);

    if (searchString.length === 0) {
        setSuggestions(templateListData);
    } else {
      const regex = new RegExp(`^${searchString}`, 'i');
        const currentSuggestions = templateListData.filter((template) =>
        regex.test(template.name),
      );
      setSuggestions(currentSuggestions);
    }
  }

  function handleFocus() {
    setIsFocus(true);
      setSuggestions(templateListData);
  }

  return (
    <div>
      <InputWrapper>
        <Label htmlFor="image-type-meme">Image</Label>
        <Input
          id="image-type-meme"
          value={imageName}
          onFocus={() => handleFocus(true)}
          onChange={(event) => onTextChanged(event)}
        />

        {isFocus && (
          <DropdownPosition>
            <Dropdown>
              {suggestions.map((suggestion) => (
                <DropdownList key={suggestion.id}>
                  <DropdownOption
                    onClick={() => {
                      suggestionSelected(suggestion);
                      setIsFocus(false);
                    }}
                  >
                    {suggestion.name}
                  </DropdownOption>
                </DropdownList>
              ))}
            </Dropdown>
          </DropdownPosition>
        )}
      </InputWrapper>
    </div>
  );
}
