type HeadingProps = {
    title: string;
    description: string;
};

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
};
