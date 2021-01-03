import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { Arr } from "../Context/ArrContext";
import { db } from "../Firebase/firebase";

const useStyles = makeStyles({
  root: {
    // height: 216,
    // flexGrow: 1,
    // maxWidth: 400,
  },
});

function TreeRender({ folderArr }) {
  const classes = useStyles();

  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const { user } = useContext(Arr);
  useEffect(() => {
    db.collection(`channels/${user?.uid}/renderlist`)
      .doc("Expanded")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setExpanded(data.expanded);
        }
      });
  }, [user?.uid]);

  const handleToggle = (e, nodeIds) => {
    setExpanded(nodeIds);
    db.collection(`channels/${user?.uid}/renderlist`)
      .doc("Expanded")
      .set({ expanded: nodeIds });
  };

  const handleSelect = (e, nodeIds) => {
    setSelected(nodeIds);
  };

  const handleDelete = async (folder, id, url) => {
    db.collection(`channels/${user?.uid}/folder`)
      .doc(folder)
      .update({ url: url.filter((link) => link.id !== id) });
  };

  return (
    <>
      {folderArr.map((data) => (
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          key={data.folder}
        >
          <TreeItem nodeId={data.folder} label={data?.folder}>
            {data?.url?.length > 0 &&
              data?.url?.map((link) => (
                <div key={link.id}>
                  <Chip
                    size="medium"
                    onClick={() => window.open(link.url, "_blank")}
                    avatar={
                      <Avatar
                        style={{ width: "16px", height: "16px" }}
                        alt="ico"
                        src={link.logo}
                      />
                    }
                    label={link.hostname}
                    onDelete={() =>
                      handleDelete(data.folder, link.id, data.url)
                    }
                    variant="outlined"
                  />
                </div>
              ))}
          </TreeItem>
        </TreeView>
      ))}
    </>
  );
}
export default TreeRender;
