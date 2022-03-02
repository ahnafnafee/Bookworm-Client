import * as React from "react";
import Head from "next/head";
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BookDetails } from "../components/BookDetails";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Search as SearchIcon, Close } from "react-ionicons";
import { useFormik } from "formik";
import * as Yup from "yup";
import randomColor from "randomcolor";

export default function Search() {
    const inputLeftRef = React.useRef();
    const inputRightRef = React.useRef();
    const [isFocused, setIsFocused] = React.useState(false);
    const [show, setShow] = React.useState(false);

    const toggleFocus = () => {
        setIsFocused(!isFocused);
    };

    const {
        touched,
        errors,
        getFieldProps,
        validateForm,
        isValid,
        dirty,
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        resetForm,
        values,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            query: "",
        },
        validationSchema: Yup.object().shape({
            query: Yup.string().required("Required"),
        }),
        async onSubmit(values, formikActions) {
            console.log(values);
        },
    });

    React.useEffect(() => {
        if (values.query.length > 0) setShow(true);
        else setShow(false);
    }, [values.query.length]);

    React.useEffect(() => {
        if (isFocused) {
            document.getElementById("footer-main").classList.add("hidden");
        } else {
            document.getElementById("footer-main").classList.remove("hidden");
        }
    }, [isFocused]);

    return (
        <div className="flex h-full w-screen">
            <NextSeo
                title="Search"
                description="Allows the user to search for their favorite books"
                canonical="https://github.com/ahnafnafee"
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <div className="flex flex-col flex-1 justify-start">
                <div className="flex flex-col justify-between h-16 mt-7 px-5">
                    <InputGroup>
                        <InputLeftElement
                            ref={inputLeftRef}
                            ps={3}
                            me={4}
                            w="fit-content"
                            h="full"
                            color="grey.600"
                        >
                            <SearchIcon size="20" color="#000" />
                        </InputLeftElement>
                        <Input
                            ps={12}
                            variant="outline"
                            onFocus={toggleFocus}
                            onKeyDown={handleSubmit}
                            placeholder="Search"
                            onBlur={toggleFocus}
                            onChange={handleChange("query")}
                            value={values.query}
                        />
                        {show && (
                            <InputRightElement
                                ref={inputRightRef}
                                w="fit-content"
                                pe={4}
                                h="full"
                                color="grey.600"
                                onClick={() => {
                                    resetForm();
                                }}
                            >
                                <Close size="20" color="#000" />
                            </InputRightElement>
                        )}
                    </InputGroup>
                    {/* {(!isFocused || show) && (
                        <>
                            <div className="flex flex-col mt-4">
                                <Text fontSize="xl" fontWeight={"bold"}>
                                    Category
                                </Text>
                                <div className="grid grid-rows-2 grid-flow-col gap-4 justify-around items-center mt-4">
                                    {categories.map((item) => (
                                        <div key={item}>
                                            <Button
                                                className="flex flex-1 flex-col justify-around items-center"
                                                style={{
                                                    height: 120,
                                                    width: 100,
                                                    backgroundColor:
                                                        randomColor({
                                                            luminosity: "dark",
                                                            format: "rgb",
                                                            hue: "monochrome",
                                                        }),
                                                    borderRadius: 8,
                                                    boxShadow:
                                                        "0 4px 14px 0 rgb(0 118 255 / 8%)",
                                                }}
                                                onClick={() =>
                                                    console.log(
                                                        `Searching ${item}`
                                                    )
                                                }
                                            >
                                                <Text
                                                    color={"white"}
                                                    fontWeight={"bold"}
                                                    align={"center"}
                                                >
                                                    {item}
                                                </Text>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )} */}
                </div>

                <div className="flex flex-col flex-1 px-5 pt-2 mt-1"></div>
            </div>
        </div>
    );
}

const categories = [
    "Fiction",
    "Poetry",
    "Fantasy",
    "Romance",
    "Adult",
    "Mystery",
];
