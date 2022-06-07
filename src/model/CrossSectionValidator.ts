import { ConcreteRectangle } from "./ConcreteRectangle";
import { Rebar } from "./Rebar";

export class CrossSectionValidator {
  validateRectanglesPosition(rectangleArrayList: ConcreteRectangle[]) {
    rectangleArrayList.forEach((primaryRectangle) => {
      const primaryRectLeftVertice =
        primaryRectangle.getxCenterCoord() - primaryRectangle.getWidth() / 2;
      const primaryRectRightVertice =
        primaryRectangle.getxCenterCoord() + primaryRectangle.getWidth() / 2;
      const primaryRectTopVertice =
        primaryRectangle.getyCenterCoord() + primaryRectangle.getHeight() / 2;
      const primaryRectBottomVertice =
        primaryRectangle.getyCenterCoord() - primaryRectangle.getHeight() / 2;

      let isCrossSectionContinuous = false;

      rectangleArrayList.forEach((secondaryRectangle) => {
        if (primaryRectangle != secondaryRectangle) {
          const secondaryRectLeftVertice =
            secondaryRectangle.getxCenterCoord() -
            secondaryRectangle.getWidth() / 2;
          const secondaryRectRightVertice =
            secondaryRectangle.getxCenterCoord() +
            secondaryRectangle.getWidth() / 2;
          const secondaryRectTopVertice =
            secondaryRectangle.getyCenterCoord() +
            secondaryRectangle.getHeight() / 2;
          const secondaryRectBottomVertice =
            secondaryRectangle.getyCenterCoord() -
            secondaryRectangle.getHeight() / 2;

          if (
            primaryRectLeftVertice < secondaryRectRightVertice &&
            primaryRectRightVertice > secondaryRectLeftVertice &&
            primaryRectBottomVertice < secondaryRectTopVertice &&
            primaryRectTopVertice > secondaryRectBottomVertice
          ) {
            throw "Invalid cross-section input, rectangles overlap";
          }

          if (primaryRectangle.getHeight() < secondaryRectangle.getHeight()) {
            if (
              primaryRectLeftVertice == secondaryRectRightVertice ||
              primaryRectRightVertice == secondaryRectLeftVertice
            ) {
              if (
                (secondaryRectBottomVertice <= primaryRectBottomVertice &&
                  primaryRectBottomVertice <= secondaryRectTopVertice) ||
                (secondaryRectBottomVertice <= primaryRectTopVertice &&
                  primaryRectTopVertice <= secondaryRectTopVertice)
              ) {
                isCrossSectionContinuous = true;
                return;
              }
            }
          } else {
            if (
              primaryRectLeftVertice == secondaryRectRightVertice ||
              primaryRectRightVertice == secondaryRectLeftVertice
            ) {
              if (
                (primaryRectBottomVertice <= secondaryRectBottomVertice &&
                  secondaryRectBottomVertice <= primaryRectTopVertice) ||
                (primaryRectBottomVertice <= secondaryRectTopVertice &&
                  secondaryRectTopVertice <= primaryRectTopVertice)
              ) {
                isCrossSectionContinuous = true;
                return;
              }
            }
          }

          if (primaryRectangle.getWidth() < secondaryRectangle.getWidth()) {
            if (
              primaryRectBottomVertice == secondaryRectTopVertice ||
              primaryRectTopVertice == secondaryRectBottomVertice
            ) {
              if (
                (secondaryRectLeftVertice <= primaryRectLeftVertice &&
                  primaryRectLeftVertice <= secondaryRectRightVertice) ||
                (secondaryRectLeftVertice <= primaryRectRightVertice &&
                  primaryRectRightVertice <= secondaryRectRightVertice)
              ) {
                isCrossSectionContinuous = true;
                return;
              }
            }
          } else {
            if (
              primaryRectBottomVertice == secondaryRectTopVertice ||
              primaryRectTopVertice == secondaryRectBottomVertice
            ) {
              if (
                (primaryRectLeftVertice <= secondaryRectLeftVertice &&
                  secondaryRectLeftVertice <= primaryRectRightVertice) ||
                (primaryRectLeftVertice <= secondaryRectRightVertice &&
                  secondaryRectRightVertice <= primaryRectRightVertice)
              ) {
                isCrossSectionContinuous = true;
                return;
              }
            }
          }
        }
      });

      if (!isCrossSectionContinuous && rectangleArrayList.length > 1) {
        throw "Cross Section must be continuous";
      }
    });
  }

  validateRebarsPosition(
    rebarArrayList: Rebar[],
    rectangleArrayList: ConcreteRectangle[]
  ) {
    rebarArrayList.forEach((primaryRebar) => {
      const primaryRebarLeftExtreme =
        primaryRebar.getxCoord() - primaryRebar.getDiameter() / 20;
      const primaryRebarRightExtreme =
        primaryRebar.getxCoord() + primaryRebar.getDiameter() / 20;
      const primaryRebarTopExtreme =
        primaryRebar.getyCoord() + primaryRebar.getDiameter() / 20;
      const primaryRebarBottomExtreme =
        primaryRebar.getyCoord() - primaryRebar.getDiameter() / 20;

      let isInsideCrossSection = false;

      rectangleArrayList.forEach((rectangle) => {
        const rectLeftVertice =
          rectangle.getxCenterCoord() - rectangle.getWidth() / 2;
        const rectRightVertice =
          rectangle.getxCenterCoord() + rectangle.getWidth() / 2;
        const rectTopVertice =
          rectangle.getyCenterCoord() + rectangle.getHeight() / 2;
        const rectBottomVertice =
          rectangle.getyCenterCoord() - rectangle.getHeight() / 2;

        if (
          rectLeftVertice <= primaryRebarLeftExtreme &&
          rectRightVertice >= primaryRebarRightExtreme &&
          rectBottomVertice <= primaryRebarBottomExtreme &&
          rectTopVertice >= primaryRebarTopExtreme
        ) {
          isInsideCrossSection = true;
        }
      });

      if (!isInsideCrossSection) {
        throw "Rebars must be inside the cross section";
      }

      rebarArrayList.forEach((secondaryRebar) => {
        if (primaryRebar != secondaryRebar) {
          const rebarsDistanceSquared =
            Math.pow(primaryRebar.getxCoord() - secondaryRebar.getxCoord(), 2) +
            Math.pow(primaryRebar.getyCoord() - secondaryRebar.getyCoord(), 2);

          const radiusSumSquared = Math.pow(
            primaryRebar.getDiameter() / 20 + secondaryRebar.getDiameter() / 20,
            2
          );

          if (rebarsDistanceSquared < radiusSumSquared) {
            throw "Rebars cannot be overlaped";
          }
        }
      });
    });
  }
}
