import React from "react";
import profilePicture from "../../../static/assets/images/bio.png";

export default function () {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-col"
        style={{
          background: "url(" + profilePicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="right-col">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida,
        mi vel porta pulvinar, ipsum massa dapibus tortor, sed accumsan enim
        metus sed odio. Aliquam erat volutpat. Nam tincidunt sem eu sem aliquet,
        sed tempor lacus tempor. Mauris sit amet vestibulum velit. Sed vitae
        varius ex. Suspendisse orci quam, tristique sit amet rutrum vel,
        molestie a elit. Phasellus purus quam, viverra vitae est eu, hendrerit
        egestas lorem. Ut posuere condimentum feugiat. Proin condimentum, eros
        sed porta vestibulum, urna purus semper ipsum, in semper eros nibh ac
        justo. Sed non nisi et nisi luctus rhoncus et pharetra dui. Suspendisse
        lobortis imperdiet velit eu ornare. In tempor leo eget velit ultrices,
        at ullamcorper nisl vehicula. Integer massa felis, laoreet a lacinia at,
        volutpat id tortor. Donec luctus pretium tellus, a faucibus nibh cursus
        sit amet. Phasellus lectus quam, rutrum sed fermentum id, pellentesque
        porttitor tellus. Nullam feugiat accumsan tellus, id condimentum neque
        vestibulum vel. Cras pretium congue tortor, consectetur volutpat diam
        fermentum ut. Nunc sed felis in lectus commodo efficitur bibendum quis
        libero. Integer condimentum, metus ut tincidunt tincidunt, enim nisl
        blandit quam, in scelerisque nisi ante scelerisque ligula. Praesent non
        lectus faucibus augue tincidunt fringilla et vitae ex. Donec non purus
        molestie, venenatis libero ac, tincidunt ligula. Nunc sapien diam,
        tincidunt eu sapien faucibus, eleifend pellentesque velit. Nullam
        vulputate efficitur sem, nec vulputate mauris elementum eget. Integer
        non vulputate dui. Phasellus venenatis magna in neque molestie pharetra.
        Integer accumsan, nulla ac sollicitudin efficitur, velit ante
        condimentum urna, ut accumsan magna justo pulvinar arcu. Aenean mollis
        nulla sed libero pulvinar, ut volutpat tortor convallis. Vivamus quis
        semper diam. Mauris nulla diam, fermentum nec pretium et, tempus et
        orci. Etiam id tempus arcu, ut suscipit nisl. Etiam sollicitudin at
        nulla ut commodo.
      </div>
    </div>
  );
}
