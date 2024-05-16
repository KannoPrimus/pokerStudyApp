import React, { useState } from 'react';
import './Sidebar.css'; // Asegúrate de tener un archivo CSS con los estilos adecuados
import { useAuthenticator } from '@aws-amplify/ui-react';

function Sidebar() {
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState('');
    const [suggestions, setSuggestions] = useState(['vs RECR', 'vs REG','OOP','IP','DEEP','SRP','3BP','4BP']);
    const [showSuggestions, setShowSuggestions] = useState(false); // Nuevo estado para controlar la visibilidad

    const {signOut, user} = useAuthenticator();


    const handleTitleChange = e => {
        setTitle(e.target.value);
    };

    const handleTagInput = e => {
        const input = e.target.value;
        setInputTag(input);
        updateSuggestions(input);
    };

    const updateSuggestions = input => {
        if (input.length > 0) { // Solo mostrar sugerencias si hay algo escrito
            const filteredSuggestions = ['vs RECR', 'vs REG','OOP','IP','DEEP','SRP','3BP','4BP'].filter(tag =>
                tag.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true); // Mostrar sugerencias solo si hay entrada
        } else {
            setShowSuggestions(false); // Ocultar sugerencias si el input está vacío
        }
    };

    const addTag = tag => {
        if (tag && !tags.includes(tag)) {
            setTags(prev => [...prev, tag]);
            setInputTag('');
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const removeTag = tagToRemove => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="sidebar">
            <input
                id="handTitle"
                type="text"
                placeholder="Enter a title..."
                value={title}
                onChange={handleTitleChange}
                className="input"
            />
            <div className="tag-input-container">
                <input
                    type="text"
                    placeholder="Add tag..."
                    value={inputTag}
                    onChange={handleTagInput}
                    className="input"
                />
                {showSuggestions && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li className="suggestionItem" key={index} onClick={() => addTag(suggestion)}>
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="tags-container">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">
            {tag}
                        <button onClick={() => removeTag(tag)}>x</button>
          </span>
                ))}
            </div>
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}

export default Sidebar;
