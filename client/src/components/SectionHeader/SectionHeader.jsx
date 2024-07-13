import './SectionHeader.css';

export const SectionHeader = ({ section, is_create }) => {
    return (
      <div className='bar'>
        <p>
          {section}
          {is_create && <button className="create-button">Create</button>}
        </p>
      </div>
    );
  };
