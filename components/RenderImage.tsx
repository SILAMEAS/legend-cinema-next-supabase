import React, { useEffect, useMemo } from "react";
import Image, { ImageProps } from "next/image";

interface RenderImageProps extends Omit<ImageProps, "src"> {
    src: string | File;
}

const RenderImage: React.FC<RenderImageProps> = (props) => {
    const { src, alt, ...rest } = props;

    // ✅ Generate preview URL for File
    const resolvedSrc = useMemo(() => {
        if (src instanceof File) {
            return URL.createObjectURL(src);
        }
        return src;
    }, [src]);

    // ✅ Clean up object URL when component unmounts
    useEffect(() => {
        if (src instanceof File) {
            return () => URL.revokeObjectURL(resolvedSrc);
        }
    }, [src, resolvedSrc]);

    return (
        <Image
            src={resolvedSrc}
            alt={alt ?? "Preview image"}
            width={100}
            height={100}
            className="w-full h-64 object-cover"
            {...rest} // ✅ no duplicate `alt` or `src`
        />
    );
};

export default RenderImage;
