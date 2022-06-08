import { useState } from "react";
import AddButton from "../../../../components/AddButton";
import { useColumnDataContext } from "../../../../hooks/useColumnDataContext";
import errorMsg from "../../../../utilities/errorMsg";
import handleCheckRectOverlap from "../../../../utilities/handleCheckOverlap";
import handleValidateMinimum from "../../../../utilities/handleValidateMinimum";
import handleValidateNumber from "../../../../utilities/handleValidateNumber";

export function AddRectangle() {
  const { state, dispatch } = useColumnDataContext();

  const [rectProps, setRectProps] = useState({
    width: 25,
    height: 40,
    xCoord: 0,
    yCoord: 0,
  });

  return (
    <div className="w-full h-full justify-between flex flex-col 2xl:w-[calc(100%/2-0.75rem)]">
      <form className="flex flex-wrap justify-between" action="#">
        <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
          <span className="ml-2 text-sm text-brandGreen-300">
            Largura (X) (cm)
          </span>
          <input
            type="number"
            min={0}
            required
            defaultValue={rectProps.width}
            onBlur={(e) => {
              if (
                handleValidateMinimum(
                  e,
                  1,
                  "Largura deve ser um número positivo"
                )
              ) {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
                );
                setRectProps({
                  ...rectProps,
                  width: parseFloat(e.target.value),
                });
                return;
              } else {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none "
                );
              }
              e.target.value = String(rectProps.width);
            }}
            className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
          />
        </div>
        <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
          <span className="ml-2 text-sm text-brandGreen-300">
            Altura (Y) (cm)
          </span>
          <input
            type="number"
            min={0}
            required
            defaultValue={rectProps.height}
            onBlur={(e) => {
              if (
                handleValidateMinimum(
                  e,
                  1,
                  "Altura deve ser um número positivo"
                )
              ) {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
                );
                setRectProps({
                  ...rectProps,
                  height: parseFloat(e.target.value),
                });
                return;
              } else {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none "
                );
              }
              e.target.value = String(rectProps.height);
            }}
            className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
          />
        </div>
        <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
          <span className="ml-2 text-sm text-brandGreen-300">
            Coord. X CG (cm)
          </span>
          <input
            type="number"
            required
            defaultValue={rectProps.xCoord}
            onBlur={(e) => {
              if (
                handleValidateNumber(
                  e,
                  "A coordenada X do CG deve ser um número"
                )
              ) {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
                );
                setRectProps({
                  ...rectProps,
                  xCoord: parseFloat(e.target.value),
                });
                return;
              } else {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none "
                );
              }
              e.target.value = String(rectProps.xCoord);
            }}
            className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
          />
        </div>
        <div className="py-1 w-full md:w-[calc(100%/2-1.25rem)] 2xl:w-full flex flex-col">
          <span className="ml-2 text-sm text-brandGreen-300">
            Coord. Y CG (cm)
          </span>
          <input
            type="number"
            required
            defaultValue={rectProps.yCoord}
            onBlur={(e) => {
              if (
                handleValidateNumber(
                  e,
                  "A coordenada Y do CG deve ser um número"
                )
              ) {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
                );
                setRectProps({
                  ...rectProps,
                  yCoord: parseFloat(e.target.value),
                });
                return;
              } else {
                e.target.setAttribute(
                  "class",
                  "w-full bg-white rounded-2xl border-red-500 text-red-500 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none "
                );
              }
              e.target.value = String(rectProps.yCoord);
            }}
            className="w-full bg-white rounded-2xl border-brandGreen-300 text-brandGreen-300 text-sm duration-200 disabled:bg-[#CFCFCF] py-1 mb-2 focus:border-brandPurple-300 focus:ring-offset-brandPurple-300 focus:ring-1 focus:ring-brandPurple-300 focus:outline-none resize-none"
          />
        </div>
      </form>
      <div>
        <AddButton
          onClick={() => {
            if (
              rectProps.width > 0 &&
              rectProps.height > 0 &&
              !Number.isNaN(rectProps.xCoord) &&
              !Number.isNaN(rectProps.yCoord)
            ) {
              if (!handleCheckRectOverlap(rectProps, state.rectangleList)) {
                dispatch({
                  type: "add-rectangle",
                  payload: {
                    index: state.elementCounter,
                    width: rectProps.width,
                    height: rectProps.height,
                    xCenterCoordinate: rectProps.xCoord,
                    yCenterCoordinate: rectProps.yCoord,
                    isHighlighted: false,
                  },
                });
              }
            } else {
              errorMsg("Dados do retângulo inválidos");
            }
          }}
        />
      </div>
    </div>
  );
}
