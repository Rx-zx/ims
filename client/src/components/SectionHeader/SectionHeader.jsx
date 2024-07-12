import './SectionHeader.css';

export const SectionHeader = ({section}) => {

    return (
    <div className='bar'>
        <p>{section}</p>
    </div>
    );
};
